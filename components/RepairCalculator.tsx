'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronRight, Phone, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const equipmentTypes = [
  { id: 'trade', label: 'Торговое оборудование', emoji: '🏪', desc: 'Витрины, камеры, шкафы' },
  { id: 'industrial', label: 'Промышленное', emoji: '🏭', desc: 'Чиллеры, агрегаты, камеры' },
  { id: 'climate', label: 'Кондиционер', emoji: '❄️', desc: 'Сплит, мультисплит, VRF' },
  { id: 'auto', label: 'Автокондиционер', emoji: '🚗', desc: 'Легковые, кроссоверы, спецтехника' },
  { id: 'refrigerator', label: 'Рефрижератор', emoji: '🚛', desc: 'Thermo King, Carrier' },
];

const problemTypes: Record<
  string,
  { id: string; label: string; minPrice: number; maxPrice: number }[]
> = {
  trade: [
    { id: 'no_cool', label: 'Не охлаждает / плохо охлаждает', minPrice: 1500, maxPrice: 5000 },
    { id: 'leak', label: 'Утечка фреона', minPrice: 2000, maxPrice: 4500 },
    { id: 'noise', label: 'Посторонний шум / вибрация', minPrice: 1000, maxPrice: 3000 },
    { id: 'no_start', label: 'Не включается', minPrice: 500, maxPrice: 3000 },
    { id: 'ice', label: 'Намерзает лёд / иней', minPrice: 1000, maxPrice: 3500 },
    { id: 'maintenance', label: 'Плановое обслуживание', minPrice: 1500, maxPrice: 3000 },
  ],
  industrial: [
    { id: 'no_cool', label: 'Не выходит на температуру', minPrice: 2000, maxPrice: 8000 },
    { id: 'leak', label: 'Утечка хладагента', minPrice: 2500, maxPrice: 6000 },
    { id: 'compressor', label: 'Неисправность компрессора', minPrice: 5000, maxPrice: 15000 },
    { id: 'control', label: 'Сбой автоматики / щита управления', minPrice: 1500, maxPrice: 5000 },
    { id: 'maintenance', label: 'Плановое техобслуживание', minPrice: 3000, maxPrice: 7000 },
  ],
  climate: [
    { id: 'no_cool', label: 'Не охлаждает / не греет', minPrice: 1500, maxPrice: 4500 },
    { id: 'leak', label: 'Утечка фреона', minPrice: 1500, maxPrice: 3500 },
    { id: 'noise', label: 'Шум при работе', minPrice: 500, maxPrice: 2500 },
    { id: 'no_start', label: 'Не включается / ошибка', minPrice: 500, maxPrice: 3000 },
    { id: 'drip', label: 'Капает вода / протечка', minPrice: 500, maxPrice: 2000 },
    { id: 'refill', label: 'Заправка фреоном', minPrice: 1500, maxPrice: 2500 },
  ],
  auto: [
    { id: 'no_cool', label: 'Не дует холодный воздух', minPrice: 1500, maxPrice: 4000 },
    { id: 'leak', label: 'Утечка фреона', minPrice: 1000, maxPrice: 3000 },
    { id: 'compressor', label: 'Неисправность компрессора', minPrice: 4000, maxPrice: 8000 },
    { id: 'refill', label: 'Заправка кондиционера', minPrice: 1500, maxPrice: 1500 },
    { id: 'noise', label: 'Шум при включении', minPrice: 1000, maxPrice: 3500 },
  ],
  refrigerator: [
    { id: 'no_cool', label: 'Не держит температуру', minPrice: 2000, maxPrice: 6000 },
    { id: 'leak', label: 'Утечка хладагента', minPrice: 2000, maxPrice: 5000 },
    { id: 'compressor', label: 'Неисправность компрессора', minPrice: 6000, maxPrice: 12000 },
    { id: 'electric', label: 'Электрическая неисправность', minPrice: 1500, maxPrice: 5000 },
    { id: 'pipe', label: 'Ремонт / пайка трубопровода', minPrice: 1000, maxPrice: 3500 },
    { id: 'maintenance', label: 'Плановое обслуживание', minPrice: 3000, maxPrice: 6000 },
  ],
};

const urgencyOptions = [
  { id: 'normal', label: 'Обычный', desc: 'В течение дня', multiplier: 1, badge: '' },
  { id: 'urgent', label: 'Срочный', desc: 'В течение 2 часов', multiplier: 1.2, badge: '+20%' },
  { id: 'night', label: 'Ночной', desc: 'С 22:00 до 08:00', multiplier: 1.4, badge: '+40%' },
];

export default function RepairCalculator() {
  const [step, setStep] = useState(0);
  const [equipment, setEquipment] = useState('');
  const [problem, setProblem] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [showResult, setShowResult] = useState(false);

  const selectedEquipment = equipmentTypes.find((e) => e.id === equipment);
  const selectedProblem = problemTypes[equipment]?.find((p) => p.id === problem);
  const selectedUrgency = urgencyOptions.find((u) => u.id === urgency);

  const calcPrice = () => {
    if (!selectedProblem || !selectedUrgency) return { min: 0, max: 0 };
    const visitCost = 1000;
    const min = Math.round((selectedProblem.minPrice + visitCost) * selectedUrgency.multiplier);
    const max = Math.round((selectedProblem.maxPrice + visitCost) * selectedUrgency.multiplier);
    return { min, max };
  };

  const price = calcPrice();

  const reset = () => {
    setStep(0);
    setEquipment('');
    setProblem('');
    setUrgency('normal');
    setShowResult(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Калькулятор стоимости ремонта</h3>
          <p className="text-slate-400 text-sm">Предварительная оценка за 30 секунд</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step > i || showResult ? 'bg-blue-500' : step === i ? 'bg-blue-500/60' : 'bg-slate-700'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <m.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 0: Equipment type */}
            {step === 0 && (
              <div>
                <p className="text-slate-300 text-sm font-medium mb-4">
                  Шаг 1 из 3 — Выберите тип оборудования:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {equipmentTypes.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => {
                        setEquipment(eq.id);
                        setProblem('');
                        setStep(1);
                      }}
                      className="flex items-center gap-3 p-3.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-blue-500/60 rounded-xl transition-all duration-200 text-left group"
                    >
                      <span className="text-2xl">{eq.emoji}</span>
                      <div>
                        <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                          {eq.label}
                        </div>
                        <div className="text-slate-400 text-xs">{eq.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 ml-auto transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Problem type */}
            {step === 1 && equipment && (
              <div>
                <button
                  onClick={() => setStep(0)}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 mb-3 transition-colors"
                >
                  ← {selectedEquipment?.label}
                </button>
                <p className="text-slate-300 text-sm font-medium mb-4">
                  Шаг 2 из 3 — Опишите проблему:
                </p>
                <div className="space-y-2">
                  {problemTypes[equipment].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setProblem(p.id);
                        setStep(2);
                      }}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-blue-500/60 rounded-xl transition-all duration-200 text-left group"
                    >
                      <span className="text-white text-sm group-hover:text-blue-400 transition-colors">
                        {p.label}
                      </span>
                      <span className="text-slate-400 text-xs ml-3 shrink-0">
                        от {p.minPrice.toLocaleString()} ₽
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Urgency */}
            {step === 2 && problem && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 mb-3 transition-colors"
                >
                  ← {selectedProblem?.label}
                </button>
                <p className="text-slate-300 text-sm font-medium mb-4">
                  Шаг 3 из 3 — Срочность выезда:
                </p>
                <div className="space-y-2.5 mb-5">
                  {urgencyOptions.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUrgency(u.id)}
                      className={`w-full flex items-center justify-between p-3.5 border rounded-xl transition-all duration-200 ${urgency === u.id ? 'bg-blue-500/20 border-blue-500/60 text-white' : 'bg-slate-700/50 border-slate-600/50 hover:border-blue-500/40 text-slate-300 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${urgency === u.id ? 'border-blue-500 bg-blue-500' : 'border-slate-500'}`}
                        >
                          {urgency === u.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{u.label}</div>
                          <div className="text-xs text-slate-400">{u.desc}</div>
                        </div>
                      </div>
                      {u.badge && (
                        <span className="text-xs text-orange-400 font-medium">{u.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setShowResult(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <Calculator className="w-4 h-4 mr-2" /> Рассчитать стоимость
                </Button>
              </div>
            )}
          </m.div>
        ) : (
          <m.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Предварительная стоимость ремонта</p>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                {price.min.toLocaleString()} — {price.max.toLocaleString()}{' '}
                <span className="text-xl text-slate-300">₽</span>
              </div>
            </div>

            <div className="bg-slate-700/40 rounded-xl p-4 mb-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Оборудование:</span>
                <span className="text-white font-medium">
                  {selectedEquipment?.emoji} {selectedEquipment?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Проблема:</span>
                <span className="text-white font-medium text-right max-w-[200px]">
                  {selectedProblem?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Срочность:</span>
                <span className="text-white font-medium">{selectedUrgency?.label}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-200 text-xs leading-relaxed">
                Точная стоимость определяется после диагностики на месте. Диагностика бесплатна при
                согласовании ремонта.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a href="tel:+79148866774" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm">
                  <Phone className="w-4 h-4 mr-2" /> Вызвать мастера
                </Button>
              </a>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Пересчитать
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
