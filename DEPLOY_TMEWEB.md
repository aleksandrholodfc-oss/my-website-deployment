# Пошаговая инструкция по деплою на Timeweb

## 1. Подготовка сервера

Подключись к серверу через консоль Timeweb (VNC/Web Console).

### 1.1 Обнови систему

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Установи необходимое ПО

```bash
sudo apt install -y curl git nginx
```

### 1.3 Установи Node.js 18 (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # должно быть v18.x.x
npm -v
```

### 1.4 Установи PM2 (менеджер процессов)

```bash
sudo npm install -g pm2
```

---

## 2. Загрузка проекта с GitHub

### 2.1 Создай папку для сайта

```bash
sudo mkdir -p /var/www/my-website
sudo chown -R $(whoami):$(whoami) /var/www/my-website
cd /var/www/my-website
```

### 2.2 Клонируй репозиторий

Если репозиторий публичный:

```bash
git clone https://github.com/FederationCold/my-website-deployment.git .
```

Если репозиторий приватный:

```bash
git clone https://github.com/FederationCold/my-website-deployment.git .
# введи логин и пароль от GitHub, или используй Personal Access Token
```

### 2.3 Настрой переменные окружения

Создай файл `.env`:

```bash
nano .env
```

Вставь и заполни (обязательно для работы):

```env
CSRF_SECRET=твой_секрет_минимум_32_символа
ADMIN_PASSWORD_HASH=salt:hash_для_админки
TELEGRAM_BOT_TOKEN=токен_бота
TELEGRAM_CHAT_ID=id_чата
```

### 2.4 Установи зависимости и собери проект

```bash
npm ci
npm run build
```

---

## 3. Запуск сайта через PM2

Мы будем использовать режим `standalone` для повышения производительности и уменьшения размера приложения.

### 3.1 Подготовка standalone сборки

Next.js собирает все необходимые файлы в папку `.next/standalone`, но статические файлы нужно скопировать вручную:

```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
```

### 3.2 Стартуй сайт

```bash
cd /var/www/my-website
pm2 start .next/standalone/server.js --name "my-website"
```

### 3.3 Проверь, что работает

```bash
pm2 status
curl -I http://localhost:3000
```

Должен вернуть `HTTP/1.1 200 OK`.

### 3.3 Настрой автозапуск PM2

```bash
pm2 startup systemd
pm2 save
```

---

## 4. Настройка Nginx (reverse proxy)

Сайт работает на порту 3000. Nginx будет проксировать запросы с порта 80.

### 4.1 Создай конфиг

```bash
sudo nano /etc/nginx/sites-available/my-website
```

Вставь:

```nginx
server {
    listen 80;
    server_name _;  # замени на свой IP или домен, например: 186.246.30.117

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Активируй конфиг

```bash
sudo ln -s /etc/nginx/sites-available/my-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4.3 Проверь

Открой в браузере:

```
http://ТВОЙ_IP
```

Сайт должен открываться.

---

## 5. Обновление сайта (последующие деплои)

Когда нужно обновить сайт после изменений:

```bash
cd /var/www/my-website
git pull
npm ci
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
pm2 restart my-website
```

---

## 6. Полезные команды

| Команда | Описание |
|---------|----------|
| `pm2 status` | Статус всех процессов |
| `pm2 logs my-website` | Логи сайта |
| `pm2 restart my-website` | Перезапуск |
| `pm2 stop my-website` | Остановка |
| `sudo systemctl restart nginx` | Рестарт Nginx |
| `sudo nginx -t` | Проверка конфига Nginx |

---

## 7. Если что-то не работает

### Сайт не открывается

```bash
# Проверь, работает ли Node.js приложение
curl -I http://localhost:3000

# Проверь статус Nginx
sudo systemctl status nginx

# Проверь логи PM2
pm2 logs my-website

# Проверь логи Nginx
sudo tail -f /var/log/nginx/error.log
```

### Ошибка при сборке

```bash
# Удали старые зависимости и собери заново
rm -rf node_modules .next
npm ci
npm run build
```

---

## Кратко (для копирования)

Выполни на сервере подряд:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo mkdir -p /var/www/my-website
sudo chown -R $(whoami):$(whoami) /var/www/my-website
cd /var/www/my-website
git clone https://github.com/FederationCold/my-website-deployment.git .
npm ci
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
pm2 start .next/standalone/server.js --name "my-website"
pm2 startup systemd
pm2 save
```
