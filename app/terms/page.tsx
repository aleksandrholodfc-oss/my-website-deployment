import { Metadata } from 'next';
import React from 'react';
import { FileText, Scale, Wrench, Wallet, ShieldCheck, RotateCcw, MessageSquare, Mail, Phone } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение — Федерация Холода',
  description: 'Пользовательское соглашение, публичная оферта и условия оказания услуг ООО ФХ. Реквизиты, гарантии, порядок оплаты.',
  keywords: 'пользовательское соглашение, публичная оферта, условия оказания услуг, ремонт холодильного оборудования, Иркутск',
  alternates: {
    canonical: 'https://федерация-холода.рф/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'Пользовательское соглашение', href: '/terms' }]} />
        </div>
        <SectionHeader title="Пользовательское соглашение" subtitle="Условия использования сайта и оказания услуг" centered />
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto -mt-6 mb-8">
          Настоящий документ является публичной офертой и регулирует отношения между ООО ФХ
          и пользователями сайта при заказе услуг по ремонту и обслуживанию холодильного оборудования.
        </p>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
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
                  Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между
                  <strong> ООО ФХ</strong> (ИНН 3808291878, ОГРН 1255800006162, далее — «Исполнитель»)
                  и пользователем (далее — «Заказчик») при использовании сайта <strong>федерация-холода.рф</strong> (далее — «Сайт»)
                  и заказе услуг по ремонту и обслуживанию холодильного оборудования.
                </p>
                <p>
                  Соглашение разработано в соответствии с Гражданским кодексом РФ, Федеральным законом от 07.02.1992 № 2300-1
                  «О защите прав потребителей», а также иными нормативными правовыми актами Российской Федерации.
                </p>
                <p>
                  Настоящее Соглашение является <strong>публичной офертой</strong> в соответствии со ст. 437 ГК РФ.
                  Акцептом оферты является оформление заявки на Сайте или по телефону, либо фактическое использование услуг Исполнителя.
                </p>
              </div>
            </div>

            {/* Раздел 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">2. Предмет соглашения</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Исполнитель обязуется оказать Заказчику следующие услуги:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Диагностика и ремонт торгового холодильного оборудования</li>
                  <li>Диагностика и ремонт промышленного холодильного оборудования</li>
                  <li>Установка, обслуживание и ремонт климатического оборудования и кондиционеров</li>
                  <li>Диагностика, заправка и ремонт автокондиционеров</li>
                  <li>Ремонт и обслуживание рефрижераторных установок</li>
                  <li>Плановое техническое обслуживание холодильного оборудования</li>
                </ul>
                <p>Заказчик обязуется оплатить оказанные услуги в порядке и на условиях, предусмотренных настоящим Соглашением.</p>
              </div>
            </div>

            {/* Раздел 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">3. Порядок оказания услуг</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>3.1.</strong> Заказчик оформляет заявку на Сайте или по телефону, указывая контактные данные, тип оборудования и характер неисправности.</p>
                <p><strong>3.2.</strong> Исполнитель связывается с Заказчиком в течение 15–30 минут для согласования времени выезда мастера.</p>
                <p><strong>3.3.</strong> Мастер производит диагностику оборудования на объекте Заказчика. Диагностика бесплатна при условии согласования ремонта.</p>
                <p><strong>3.4.</strong> После диагностики мастер сообщает Заказчику перечень необходимых работ, стоимость запчастей и сроки выполнения.</p>
                <p><strong>3.5.</strong> Ремонт производится только после письменного или устного согласия Заказчика с перечнем работ и их стоимостью.</p>
                <p><strong>3.6.</strong> Среднее время выезда мастера — до 2 часов с момента подтверждения заявки. Срочный выезд возможен в любое время суток (работаем 24/7).</p>
              </div>
            </div>

            {/* Раздел 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">4. Стоимость услуг и порядок оплаты</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>4.1.</strong> Стоимость услуг определяется индивидуально и зависит от:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Типа и марки оборудования</li>
                  <li>Характера и сложности неисправности</li>
                  <li>Необходимости замены комплектующих и расходных материалов</li>
                  <li>Удалённости объекта от базы (для Иркутска и пригорода)</li>
                </ul>
                <p><strong>4.2.</strong> Актуальные цены на типовые работы размещены в разделе «Услуги» на Сайте и носят информационный характер. Окончательная стоимость формируется после диагностики.</p>
                <p><strong>4.3. Формы оплаты:</strong></p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Наличный расчёт — оплата мастеру после выполнения работ и подписания акта</li>
                  <li>Безналичный расчёт — оплата по счёту для юридических лиц и ИП</li>
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500 mt-3">
                  <p className="font-medium text-gray-900 mb-2">Банковские реквизиты для безналичной оплаты:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Получатель:</strong> ООО ФХ</li>
                    <li><strong>ИНН:</strong> 3808291878</li>
                    <li><strong>КПП:</strong> 380801001</li>
                    <li><strong>Р/с:</strong> 40702810725580002847</li>
                    <li><strong>Банк:</strong> ФИЛИАЛ «НОВОСИБИРСКИЙ» АО «АЛЬФА-БАНК»</li>
                    <li><strong>БИК:</strong> 045004774</li>
                    <li><strong>К/с:</strong> 30101810600000000774</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Раздел 5 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">5. Гарантийные обязательства</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>5.1.</strong> Исполнитель предоставляет гарантию на выполненные работы:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Ремонт холодильного оборудования</strong> — до 12 месяцев</li>
                  <li><strong>Ремонт климатического оборудования</strong> — до 12 месяцев</li>
                  <li><strong>Ремонт автокондиционеров</strong> — до 6 месяцев</li>
                  <li><strong>Ремонт рефрижераторов</strong> — до 12 месяцев</li>
                </ul>
                <p><strong>5.2.</strong> Гарантия распространяется на работы по замене комплектующих и устранению неисправностей, выявленных в ходе диагностики.</p>
                <p><strong>5.3.</strong> Гарантия <strong>не распространяется</strong> на случаи:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Неправильной эксплуатации оборудования (механические повреждения, перегрузка, нарушение режимов работы)</li>
                  <li>Использования некачественных расходных материалов, не рекомендованных производителем</li>
                  <li>Повреждений, вызванных стихийными бедствиями, пожарами, авариями</li>
                  <li>Самостоятельного вмешательства в работу оборудования после ремонта</li>
                </ul>
                <p><strong>5.4.</strong> В случае возникновения гарантийного случая Исполнитель производит бесплатное устранение выявленных дефектов в течение 3 рабочих дней с момента подачи претензии.</p>
              </div>
            </div>

            {/* Раздел 6 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">6. Возврат денежных средств</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>6.1.</strong> Возврат денежных средств осуществляется в следующих случаях:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Невозможности устранения неисправности по объективным причинам (физический износ, отсутствие запчастей)</li>
                  <li>Нарушения Исполнителем условий настоящего Соглашения (просрочка, некачественное выполнение работ)</li>
                  <li>Отказа Заказчика от услуг до начала выполнения работ</li>
                </ul>
                <p><strong>6.2.</strong> Заявка на возврат подаётся в письменном виде или по электронной почте. Рассмотрение заявки — в течение 10 рабочих дней.</p>
                <p><strong>6.3.</strong> Возврат производится тем же способом, которым была произведена оплата, в течение 10 рабочих дней с момента принятия положительного решения.</p>
              </div>
            </div>

            {/* Раздел 7 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">7. Порядок рассмотрения претензий</h3>
              </div>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>7.1.</strong> Претензии к качеству выполненных работ подаются Заказчиком в письменном виде или по электронной почте в течение гарантийного срока.</p>
                <p><strong>7.2.</strong> Претензия должна содержать: ФИО Заказчика, дату выполнения работ, описание претензии, контактные данные для связи.</p>
                <p><strong>7.3.</strong> Исполнитель обязуется рассмотреть претензию в течение <strong>10 рабочих дней</strong> с даты её получения.</p>
                <p><strong>7.4.</strong> В случае несогласия с результатами рассмотрения претензии Заказчик вправе обратиться в Роспотребнадзор или в суд.</p>
              </div>
            </div>

            {/* Раздел 8 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">8. Ответственность сторон</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>8.1. Ответственность Исполнителя:</strong></p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Исполнитель несёт ответственность за качество выполненных работ в соответствии с законодательством РФ</li>
                  <li>Исполнитель не несёт ответственности за повреждения оборудования, вызванные заводским дефектом или естественным износом</li>
                  <li>Исполнитель не несёт ответственности за неисполнение обязательств в случае форс-мажорных обстоятельств</li>
                </ul>
                <p><strong>8.2. Ответственность Заказчика:</strong></p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Заказчик несёт ответственность за достоверность предоставленной информации об оборудовании</li>
                  <li>Заказчик обязуется обеспечить доступ мастера к оборудованию в согласованное время</li>
                  <li>Заказчик обязуется соблюдать правила эксплуатации оборудования после выполнения работ</li>
                </ul>
              </div>
            </div>

            {/* Раздел 9 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">9. Интеллектуальная собственность</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Вся текстовая и графическая информация, размещённая на Сайте, является интеллектуальной собственностью Исполнителя. Копирование, распространение или иное использование материалов Сайта без письменного согласия Исполнителя запрещено.</p>
              </div>
            </div>

            {/* Раздел 10 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">10. Защита персональных данных</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p>Обработка персональных данных Заказчика осуществляется в соответствии с Политикой конфиденциальности, размещённой на Сайте по адресу <a href="/privacy" className="text-blue-600 hover:underline">/privacy</a>, и Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
              </div>
            </div>

            {/* Раздел 11 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">11. Срок действия и изменение соглашения</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>11.1.</strong> Настоящее Соглашение вступает в силу с момента акцепта оферты и действует до полного исполнения обязательств сторон.</p>
                <p><strong>11.2.</strong> Исполнитель вправе вносить изменения в настоящее Соглашение. Новая редакция вступает в силу с момента размещения на Сайте.</p>
                <p><strong>11.3.</strong> Заказчик вправе расторгнуть Соглашение в любое время путём прекращения использования услуг Исполнителя.</p>
              </div>
            </div>

            {/* Раздел 12 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">12. Заключительные положения</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <p><strong>12.1.</strong> Настоящее Соглашение регулируется законодательством Российской Федерации.</p>
                <p><strong>12.2.</strong> Все споры и разногласия решаются путём переговоров. В случае невозможности достижения соглашения спор подлежит рассмотрению в Арбитражном суде Иркутской области.</p>
                <p><strong>12.3.</strong> Если какое-либо положение Соглашения признано недействительным, остальные положения остаются в силе.</p>
              </div>
            </div>

            {/* Раздел 13 — Контакты */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">13. Контактная информация Исполнителя</h3>
              <div className="text-gray-600 space-y-3 leading-relaxed">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="font-semibold text-gray-900">ООО ФХ</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li><strong>ИНН:</strong> 3808291878</li>
                    <li><strong>КПП:</strong> 380801001</li>
                    <li><strong>ОГРН:</strong> 1255800006162</li>
                    <li><strong>Юридический адрес:</strong> Иркутская область, Иркутский район, г.п. Марковское, рп Маркова, мкр. Березовый, д. 149, кв. 9</li>
                    <li><strong>Директор:</strong> Семенов Александр Александрович</li>
                  </ul>
                  <div className="mt-3 space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">+7 (914) 886-67-74</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">federation-cold@mail.ru</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  По всем вопросам, связанным с настоящим Соглашением, вы можете обратиться по указанным контактам.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center pt-4">Дата последнего обновления: 18 мая 2026 г.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
