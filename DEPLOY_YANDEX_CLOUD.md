# Деплой Next.js на Yandex Cloud

## Способ 1: Yandex Cloud Functions (Serverless) - Рекомендуется

### Преимущества:
- Автоматическое масштабирование
- Платите только за время выполнения
- Не нужно настраивать сервер

### Шаг 1: Установите Yandex Cloud CLI

```bash
# Установка
curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash

# Перезапустите терминал или выполните:
source ~/.bashrc

# Инициализация
yc init
```

Следуйте инструкциям в терминале для авторизации.

### Шаг 2: Создайте Dockerfile (уже создан)

Файл `Dockerfile` уже создан в корне проекта.

### Шаг 3: Соберите Docker образ

```bash
cd /home/aleks/projects/my-website

# Сборка образа
docker build -t cr.yandexcloud.net/<registry-id>/my-website:latest .

# Пример (замените registry-id на ваш):
# docker build -t cr.yandexcloud.net/crp1234567890/my-website:latest .
```

### Шаг 4: Создайте реестр в Yandex Cloud

```bash
# Создание реестра
yc container registry create --name my-website-registry

# Получение ID реестра
yc container registry list
```

### Шаг 5: Аутентификация в Container Registry

```bash
# Вход в реестр
yc container registry configure-docker

# Или вручную:
docker login cr.yandexcloud.net
```

### Шаг 6: Загрузите образ в реестр

```bash
# Замените <registry-id> на ваш ID реестра
docker push cr.yandexcloud.net/<registry-id>/my-website:latest
```

### Шаг 7: Создайте Cloud Function

```bash
# Создание функции
yc serverless function create --name my-website

# Создание версии функции с Docker образом
yc serverless function version create \
  --function-name my-website \
  --runtime container \
  --memory 512m \
  --execution-timeout 30s \
  --service-account-id <service-account-id> \
  --image cr.yandexcloud.net/<registry-id>/my-website:latest \
  --environment PORT=3000
```

### Шаг 8: Создайте API Gateway (для домена)

```bash
# Создание API Gateway
yc serverless api-gateway create --name my-website-gateway

# Добавьте спецификацию OpenAPI для маршрутизации
```

### Шаг 9: Настройте домен

1. В консоли Yandex Cloud перейдите в API Gateway
2. Добавьте домен в настройках
3. Настройте DNS записи

---

## Способ 2: Yandex Compute Cloud (VM) - Проще для начинающих

### Преимущества:
- Полный контроль над сервером
- Проще в настройке
- Подходит для сложных приложений

### Шаг 1: Создайте виртуальную машину

1. Зайдите в консоль Yandex Cloud: https://console.cloud.yandex.ru
2. Перейдите в "Compute Cloud" → "Виртуальные машины"
3. Нажмите "Создать виртуальную машину"
4. Настройте:
   - **Имя:** my-website
   - **Зона:** ru-central1-a
   - **Операционная система:** Ubuntu 22.04 LTS
   - **vCPU:** 2
   - **RAM:** 4 GB
   - **Диск:** 20 GB SSD
5. Нажмите "Создать"

### Шаг 2: Подключитесь к VM по SSH

```bash
# Получите публичный IP из консоли Yandex Cloud
ssh ubuntu@<public-ip>

# Или используйте yc CLI:
yc compute instance get --name my-website
```

### Шаг 3: Установите Docker на VM

```bash
# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавьте пользователя в группу docker
sudo usermod -aG docker ubuntu

# Выйдите и зайдите снова
exit
ssh ubuntu@<public-ip>
```

### Шаг 4: Установите Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Шаг 5: Создайте docker-compose.yml на VM

```bash
cd ~
nano docker-compose.yml
```

Содержимое:
```yaml
version: '3.8'

services:
  app:
    image: cr.yandexcloud.net/<registry-id>/my-website:latest
    container_name: my-website
    restart: unless-stopped
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
```

### Шаг 6: Загрузите образ в реестр (с локальной машины)

```bash
# На локальной машине
cd /home/aleks/projects/my-website

# Сборка
docker build -t cr.yandexcloud.net/<registry-id>/my-website:latest .

# Пуш
docker push cr.yandexcloud.net/<registry-id>/my-website:latest
```

### Шаг 7: Запустите на VM

```bash
# На VM
cd ~
docker-compose pull
docker-compose up -d
```

### Шаг 8: Настройте домен

1. Купите домен или используйте существующий
2. В настройках DNS добавьте A запись на публичный IP VM
3. Настройте Nginx (опционально) для SSL

---

## Способ 3: Yandex Managed Service for Kubernetes

Подходит для сложных микросервисных архитектур. Требует больше времени на настройку.

---

## Рекомендация

Для простого Next.js сайта рекомендую **Способ 2 (Compute Cloud VM)** - он проще в настройке и дает полный контроль.

Для production с автоматическим масштабированием используйте **Способ 1 (Cloud Functions)**.

---

## Полезные команды Yandex Cloud CLI

```bash
# Список функций
yc serverless function list

# Список версий функции
yc serverless function version list --function-name my-website

# Логи функции
yc serverless function logs --function-name my-website

# Удаление функции
yc serverless function delete --name my-website

# Список VM
yc compute instance list

# Стоп VM
yc compute instance stop --name my-website

# Старт VM
yc compute instance start --name my-website
```

## Стоимость

- **Cloud Functions:** ~0.5-2 руб/1000 запросов
- **Compute Cloud VM:** ~500-1000 руб/мес (зависит от конфигурации)
- **Container Registry:** ~0.1 руб/ГБ/день

## Документация

- Yandex Cloud Functions: https://cloud.yandex.ru/docs/functions/
- Yandex Compute Cloud: https://cloud.yandex.ru/docs/compute/
- Yandex Container Registry: https://cloud.yandex.ru/docs/container-registry/
