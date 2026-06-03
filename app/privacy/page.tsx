import { Metadata } from 'next';
import React from 'react';
import { Shield, Lock, UserCheck, Eye, FileText, Mail, Phone } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Федерация Холода',
  description:
    'Политика обработки персональных данных ООО ФХ в соответствии с ФЗ-152. Реквизиты, цели обработки, права субъектов данных.',
  keywords: 'политика конфиденциальности, персональные данные, ФЗ-152, ООО ФХ, защита данных',
  alternates: {
    canonical: 'https://федерация-холода.рф/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'Политика конфиденциальности', href: '/privacy' }]} />
        </div>
        <SectionHeader
          title="Политика конфиденциальности"
          subtitle="Защита ваших персональных данных"
          centered
        />
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto -mt-6 mb-8">
          Настоящий документ определяет порядок обработки персональных данных пользователей сайта в
          соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          {/* Карточки ключевых принципов */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <Lock className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Защита данных</h4>
              <p className="text-gray-500 text-sm">
                Технические и организационные меры для защиты ваших персональных данных
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <Eye className="w-8 h-8 text-green-500 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Прозрачность</h4>
              <p className="text-gray-500 text-sm">
                Полная информация о том, какие данные собираются и зачем
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <UserCheck className="w-8 h-8 text-purple-500 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Ваши права</h4>
              <p className="text-gray-500 text-sm">
                Право на доступ, уточнение, удаление и отзыв согласия
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Раздел 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">1. Общие положения</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
                  обработки и защиты персональных данных пользователей сайта{' '}
                  <strong>федерация-холода.рф</strong> (далее — «Сайт»).
                </p>
                <p>
                  Политика разработана в соответствии с Конституцией РФ, Федеральным законом от
                  27.07.2006 № 152-ФЗ «О персональных данных», а также иными нормативными правовыми
                  актами Российской Федерации.
                </p>
                <p>
                  Используя Сайт, Пользователь выражает согласие с условиями настоящей Политики. В
                  случае несогласия Пользователь должен немедленно прекратить использование Сайта.
                </p>
              </div>
            </div>

            {/* Раздел 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">2. Оператор персональных данных</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Оператором персональных данных является:</p>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-900">ООО ФХ</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>
                      <strong>ИНН:</strong> 3808291878
                    </li>
                    <li>
                      <strong>КПП:</strong> 380801001
                    </li>
                    <li>
                      <strong>ОГРН:</strong> 1255800006162
                    </li>
                    <li>
                      <strong>Юридический адрес:</strong> Иркутская область, Иркутский район, г.п.
                      Марковское, рп Маркова, мкр. Березовый, д. 149, кв. 9
                    </li>
                    <li>
                      <strong>Директор:</strong> Семенов Александр Александрович
                    </li>
                    <li>
                      <strong>Телефон:</strong> +7 (914) 886-67-74
                    </li>
                    <li>
                      <strong>E-mail:</strong> federation-cold@mail.ru
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Раздел 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Цели обработки персональных данных
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Оператор обрабатывает персональные данные пользователей в следующих целях:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Идентификация пользователя при оформлении заявки на ремонт и обслуживание
                    оборудования
                  </li>
                  <li>
                    Установление обратной связи с пользователем, включая направление уведомлений и
                    запросов
                  </li>
                  <li>
                    Заключение и исполнение договоров на оказание услуг по ремонту холодильного
                    оборудования
                  </li>
                  <li>
                    Информирование о статусе заявки, сроках выполнения работ и изменениях в
                    расписании
                  </li>
                  <li>
                    Направление информации о новых услугах, акциях и специальных предложениях
                    (только с согласия пользователя)
                  </li>
                  <li>
                    Проведение статистических и маркетинговых исследований для улучшения качества
                    услуг
                  </li>
                  <li>Выполнение требований законодательства РФ</li>
                </ul>
              </div>
            </div>

            {/* Раздел 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                4. Перечень обрабатываемых персональных данных
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Оператор может обрабатывать следующие категории персональных данных:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-800">Основные данные</p>
                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                      <li>• Фамилия, имя, отчество</li>
                      <li>• Контактный телефон</li>
                      <li>• Адрес электронной почты</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-800">Дополнительные данные</p>
                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                      <li>• Адрес объекта для оказания услуг</li>
                      <li>• Информация об оборудовании</li>
                      <li>• Иные данные, предоставленные добровольно</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>
                    Оператор не обрабатывает специальные категории персональных данных
                  </strong>{' '}
                  (биометрические данные, данные о состоянии здоровья, религиозных убеждениях и
                  т.д.), за исключением случаев, прямо предусмотренных законодательством РФ.
                </p>
              </div>
            </div>

            {/* Раздел 5 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                5. Правовые основания обработки
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Обработка персональных данных осуществляется на следующих правовых основаниях:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>Согласие субъекта персональных данных</strong> — при оформлении заявки
                    на сайте, в форме обратной связи, при подписке на рассылку
                  </li>
                  <li>
                    <strong>Договор</strong> — при заключении договора на оказание услуг по ремонту
                    оборудования
                  </li>
                  <li>
                    <strong>Требования законодательства РФ</strong> — при исполнении налогового,
                    бухгалтерского законодательства
                  </li>
                </ul>
              </div>
            </div>

            {/* Раздел 6 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">6. Условия и сроки обработки</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Обработка персональных данных осуществляется с момента получения согласия субъекта
                  и в течение всего периода, необходимого для достижения целей обработки.
                </p>
                <p>
                  <strong>Сроки хранения:</strong>
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Данные заявок — 3 года с момента последнего обращения</li>
                  <li>
                    Данные по договорам — в соответствии с требованиями законодательства (не менее 5
                    лет)
                  </li>
                  <li>Данные для рассылки — до момента отзыва согласия пользователем</li>
                </ul>
                <p>
                  По истечении указанных сроков персональные данные подлежат уничтожению или
                  обезличиванию.
                </p>
              </div>
            </div>

            {/* Раздел 7 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                7. Защита персональных данных
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Оператор принимает необходимые организационные и технические меры для защиты
                  персональных данных от неправомерного или случайного доступа, уничтожения,
                  изменения, блокирования, копирования, предоставления, распространения:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Использование защищённого соединения (SSL/TLS) при передаче данных</li>
                  <li>Ограничение доступа к персональным данным для сотрудников и подрядчиков</li>
                  <li>Регулярное обновление программного обеспечения и средств защиты</li>
                  <li>Проведение аудитов безопасности информационных систем</li>
                </ul>
              </div>
            </div>

            {/* Раздел 8 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                8. Передача данных третьим лицам
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Оператор <strong>не передаёт</strong> персональные данные третьим лицам, за
                  исключением следующих случаев:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Передача данных уполномоченным органам государственной власти по основаниям и в
                    порядке, предусмотренным законодательством РФ
                  </li>
                  <li>
                    Передача данных партнёрам-исполнителям (при необходимости выезда мастера) строго
                    в объёме, необходимом для оказания услуги
                  </li>
                  <li>Иные случаи, прямо предусмотренные законодательством РФ</li>
                </ul>
              </div>
            </div>

            {/* Раздел 9 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                9. Права субъектов персональных данных
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Субъект персональных данных имеет право:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Получать информацию, касающуюся обработки его персональных данных</li>
                  <li>
                    Требовать уточнения, блокирования или уничтожения своих персональных данных,
                    если они являются неполными, устаревшими, неточными
                  </li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>
                    Обжаловать действия (бездействие) Оператора в Роскомнадзоре или в судебном
                    порядке
                  </li>
                  <li>
                    На защиту своих прав и законных интересов, включая возмещение убытков и
                    компенсацию морального вреда
                  </li>
                </ul>
              </div>
            </div>

            {/* Раздел 10 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                10. Использование файлов cookies
              </h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Сайт использует файлы cookies и аналогичные технологии для:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Обеспечения корректной работы Сайта</li>
                  <li>Анализа посещаемости и поведения пользователей (Яндекс.Метрика)</li>
                  <li>Сохранения пользовательских настроек</li>
                </ul>
                <p>
                  Пользователь может отключить использование cookies в настройках браузера, однако
                  это может повлиять на функциональность Сайта.
                </p>
              </div>
            </div>

            {/* Раздел 11 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">11. Изменение политики</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Оператор вправе вносить изменения в настоящую Политику без согласования с
                  пользователем. Новая редакция Политики вступает в силу с момента её размещения на
                  Сайте, если иное не предусмотрено новой редакцией.
                </p>
              </div>
            </div>

            {/* Раздел 12 — Контакты */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">12. Контактная информация</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>
                  По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться
                  к Оператору:
                </p>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">federation-cold@mail.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">+7 (914) 886-67-74</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Также вы можете направить письменное обращение по юридическому адресу Оператора.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center pt-4">
              Дата последнего обновления: 18 мая 2026 г.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
