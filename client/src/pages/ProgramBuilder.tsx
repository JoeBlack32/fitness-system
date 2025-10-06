import { useState } from 'react'
import { Dumbbell, Target, Calendar, Apple, Flame, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
}

interface DayProgram {
  day: string
  exercises: Exercise[]
}

interface StandardProgram {
  id: string
  title: string
  description: string
  icon: string
  color: string
  program: DayProgram[]
  nutrition?: { caloriesBurned?: string }
  recommendations?: string[]
}


interface GoalProgram {
  id: string
  title: string
  description: string
  icon: string
  color: string
  duration: string
  weeklyProgram: DayProgram[]
  nutrition: {
    dailyCalories: string
    protein: string
    carbs: string
    fats: string
    caloriesBurned: string
  }
  recommendations: string[]
}

const ProgramBuilder = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'goals'>('standard')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const standardPrograms: StandardProgram[] = [
    {
      id: 'chest',
      title: 'Тренировка груди',
      description: 'Комплексная программа для развития грудных мышц',
      icon: '💪',
      color: 'from-blue-500 to-blue-600',
      program: [
        {
          day: 'Тренировочный день',
          exercises: [
            { name: 'Жим штанги лежа', sets: '4', reps: '8-10', rest: '2-3 мин' },
            { name: 'Жим гантелей на наклонной скамье', sets: '4', reps: '10-12', rest: '2 мин' },
            { name: 'Разводка гантелей лежа', sets: '3', reps: '12-15', rest: '90 сек' },
            { name: 'Отжимания на брусьях', sets: '3', reps: 'до отказа', rest: '2 мин' },
            { name: 'Кроссовер на блоках', sets: '3', reps: '15-20', rest: '60 сек' },
            { name: 'Пуловер с гантелью', sets: '3', reps: '12-15', rest: '90 сек' }
          ]
        }
      ]
    },
    {
      id: 'back',
      title: 'Спина и плечи',
      description: 'Развитие мышц спины и дельтовидных мышц',
      icon: '🔥',
      color: 'from-purple-500 to-purple-600',
      program: [
        {
          day: 'Тренировочный день',
          exercises: [
            { name: 'Подтягивания широким хватом', sets: '4', reps: '8-12', rest: '2-3 мин' },
            { name: 'Тяга штанги в наклоне', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Тяга верхнего блока', sets: '3', reps: '10-12', rest: '90 сек' },
            { name: 'Жим штанги стоя', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Махи гантелями в стороны', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Шраги со штангой', sets: '3', reps: '12-15', rest: '90 сек' },
            { name: 'Тяга к подбородку', sets: '3', reps: '10-12', rest: '90 сек' }
          ]
        }
      ]
    },
    {
      id: 'arms',
      title: 'Тренировка рук',
      description: 'Бицепсы и трицепсы - полная проработка',
      icon: '💪',
      color: 'from-green-500 to-green-600',
      program: [
        {
          day: 'Тренировочный день',
          exercises: [
            { name: 'Подъем штанги на бицепс', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Французский жим лежа', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Молотки с гантелями', sets: '3', reps: '10-12', rest: '90 сек' },
            { name: 'Разгибания на блоке', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Подъем на скамье Скотта', sets: '3', reps: '10-12', rest: '90 сек' },
            { name: 'Жим узким хватом', sets: '3', reps: '8-10', rest: '2 мин' },
            { name: 'Концентрированный подъем', sets: '3', reps: '12-15', rest: '60 сек' }
          ]
        }
      ]
    },
    {
      id: 'legs',
      title: 'Тренировка ног',
      description: 'Мощные ноги - основа силы',
      icon: '🦵',
      color: 'from-orange-500 to-orange-600',
      program: [
        {
          day: 'Тренировочный день',
          exercises: [
            { name: 'Приседания со штангой', sets: '4', reps: '8-10', rest: '3 мин' },
            { name: 'Жим ногами', sets: '4', reps: '10-12', rest: '2 мин' },
            { name: 'Румынская тяга', sets: '3', reps: '10-12', rest: '2 мин' },
            { name: 'Выпады с гантелями', sets: '3', reps: '12 на ногу', rest: '90 сек' },
            { name: 'Разгибания ног', sets: '3', reps: '12-15', rest: '90 сек' },
            { name: 'Сгибания ног', sets: '3', reps: '12-15', rest: '90 сек' },
            { name: 'Подъем на носки стоя', sets: '4', reps: '15-20', rest: '60 сек' }
          ]
        }
      ]
    }
  ]

  const goalPrograms: GoalProgram[] = [
    {
      id: 'mass',
      title: 'Набор мышечной массы',
      description: 'Программа для увеличения объема мышц',
      icon: '📈',
      color: 'from-blue-500 to-indigo-600',
      duration: '8-12 недель',
      weeklyProgram: [
        {
          day: 'Понедельник - Грудь и трицепс',
          exercises: [
            { name: 'Жим штанги лежа', sets: '4', reps: '6-8', rest: '3 мин' },
            { name: 'Жим гантелей на наклонной', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Разводка гантелей', sets: '3', reps: '10-12', rest: '90 сек' },
            { name: 'Французский жим', sets: '3', reps: '8-10', rest: '2 мин' },
            { name: 'Разгибания на блоке', sets: '3', reps: '12-15', rest: '60 сек' }
          ]
        },
        {
          day: 'Среда - Спина и бицепс',
          exercises: [
            { name: 'Становая тяга', sets: '4', reps: '6-8', rest: '3 мин' },
            { name: 'Подтягивания', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Тяга штанги в наклоне', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Подъем штанги на бицепс', sets: '3', reps: '8-10', rest: '2 мин' },
            { name: 'Молотки', sets: '3', reps: '10-12', rest: '90 сек' }
          ]
        },
        {
          day: 'Пятница - Ноги и плечи',
          exercises: [
            { name: 'Приседания', sets: '4', reps: '6-8', rest: '3 мин' },
            { name: 'Жим ногами', sets: '4', reps: '10-12', rest: '2 мин' },
            { name: 'Румынская тяга', sets: '3', reps: '10-12', rest: '2 мин' },
            { name: 'Жим штанги стоя', sets: '4', reps: '8-10', rest: '2 мин' },
            { name: 'Махи гантелями', sets: '3', reps: '12-15', rest: '60 сек' }
          ]
        }
      ],
      nutrition: {
        dailyCalories: '2800-3200 ккал',
        protein: '2-2.5 г/кг веса',
        carbs: '4-5 г/кг веса',
        fats: '1-1.2 г/кг веса',
        caloriesBurned: '400-600 ккал за тренировку'
      },
      recommendations: [
        'Питайтесь 5-6 раз в день небольшими порциями',
        'Употребляйте белок в течение 30-60 минут после тренировки',
        'Пейте минимум 2.5-3 литра воды в день',
        'Спите 7-9 часов для восстановления',
        'Постепенно увеличивайте рабочие веса',
        'Делайте прогрессивную перегрузку каждую неделю'
      ]
    },
    {
      id: 'weight-loss',
      title: 'Снижение веса',
      description: 'Жиросжигающая программа с кардио',
      icon: '🔥',
      color: 'from-red-500 to-orange-600',
      duration: '12-16 недель',
      weeklyProgram: [
        {
          day: 'Понедельник - Верх тела + Кардио',
          exercises: [
            { name: 'Жим гантелей лежа', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Тяга верхнего блока', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Жим гантелей сидя', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Подъем на бицепс', sets: '3', reps: '12-15', rest: '45 сек' },
            { name: 'Кардио (бег/велосипед)', sets: '1', reps: '20-30 мин', rest: '-' }
          ]
        },
        {
          day: 'Среда - Низ тела + HIIT',
          exercises: [
            { name: 'Приседания', sets: '3', reps: '15-20', rest: '60 сек' },
            { name: 'Выпады', sets: '3', reps: '15 на ногу', rest: '60 сек' },
            { name: 'Румынская тяга', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Ягодичный мост', sets: '3', reps: '15-20', rest: '45 сек' },
            { name: 'HIIT интервалы', sets: '6-8', reps: '30 сек работа / 30 сек отдых', rest: '-' }
          ]
        },
        {
          day: 'Пятница - Фулбоди + Кардио',
          exercises: [
            { name: 'Становая тяга', sets: '3', reps: '12-15', rest: '90 сек' },
            { name: 'Отжимания', sets: '3', reps: '15-20', rest: '60 сек' },
            { name: 'Подтягивания (или тяга)', sets: '3', reps: '10-12', rest: '60 сек' },
            { name: 'Планка', sets: '3', reps: '45-60 сек', rest: '45 сек' },
            { name: 'Кардио средней интенсивности', sets: '1', reps: '25-35 мин', rest: '-' }
          ]
        }
      ],
      nutrition: {
        dailyCalories: '1800-2200 ккал (дефицит 300-500 ккал)',
        protein: '2-2.2 г/кг веса',
        carbs: '2-3 г/кг веса',
        fats: '0.8-1 г/кг веса',
        caloriesBurned: '500-700 ккал за тренировку'
      },
      recommendations: [
        'Создайте умеренный дефицит калорий (не более 500 ккал)',
        'Сохраняйте высокое потребление белка для защиты мышц',
        'Добавьте 2-3 кардио-сессии в неделю',
        'Контролируйте порции и ведите дневник питания',
        'Пейте воду перед каждым приемом пищи',
        'Избегайте быстрых углеводов и обработанных продуктов'
      ]
    },
    {
      id: 'cutting',
      title: 'Сушка (рельеф)',
      description: 'Максимальное жиросжигание с сохранением мышц',
      icon: '⚡',
      color: 'from-yellow-500 to-red-600',
      duration: '6-8 недель',
      weeklyProgram: [
        {
          day: 'Пн/Чт - Верх тела',
          exercises: [
            { name: 'Жим штанги лежа', sets: '4', reps: '8-10', rest: '90 сек' },
            { name: 'Тяга штанги в наклоне', sets: '4', reps: '8-10', rest: '90 сек' },
            { name: 'Жим гантелей сидя', sets: '3', reps: '10-12', rest: '60 сек' },
            { name: 'Суперсет: Бицепс + Трицепс', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'HIIT кардио', sets: '1', reps: '15 мин', rest: '-' }
          ]
        },
        {
          day: 'Вт/Пт - Низ тела',
          exercises: [
            { name: 'Приседания', sets: '4', reps: '10-12', rest: '90 сек' },
            { name: 'Румынская тяга', sets: '4', reps: '10-12', rest: '90 сек' },
            { name: 'Жим ногами', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Суперсет: Разгибания + Сгибания', sets: '3', reps: '15-20', rest: '45 сек' },
            { name: 'HIIT кардио', sets: '1', reps: '15 мин', rest: '-' }
          ]
        },
        {
          day: 'Ср/Сб - Активное восстановление',
          exercises: [
            { name: 'Низкоинтенсивное кардио', sets: '1', reps: '30-45 мин', rest: '-' },
            { name: 'Упражнения на пресс', sets: '4', reps: '15-20', rest: '45 сек' },
            { name: 'Растяжка', sets: '1', reps: '15-20 мин', rest: '-' }
          ]
        }
      ],
      nutrition: {
        dailyCalories: '1600-2000 ккал (дефицит 500-700 ккал)',
        protein: '2.5-3 г/кг веса',
        carbs: '1.5-2 г/кг веса (циклирование)',
        fats: '0.6-0.8 г/кг веса',
        caloriesBurned: '600-800 ккал за тренировку'
      },
      recommendations: [
        'Высокое потребление белка критично для сохранения мышц',
        'Циклируйте углеводы: больше в дни тренировок, меньше в дни отдыха',
        'Тренировки должны быть короткими но интенсивными',
        'Добавьте ежедневное утреннее кардио натощак (20-30 мин)',
        'Употребляйте BCAA перед тренировкой',
        'Важно: сушка требует опыта, начните с обычного похудения'
      ]
    },
    {
      id: 'tone',
      title: 'Привести тело в тонус',
      description: 'Подтянутое тело и общая физическая форма',
      icon: '✨',
      color: 'from-green-500 to-teal-600',
      duration: '8-12 недель',
      weeklyProgram: [
        {
          day: 'Понедельник - Фулбоди силовая',
          exercises: [
            { name: 'Приседания с гантелями', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Отжимания (с колен если нужно)', sets: '3', reps: '10-15', rest: '60 сек' },
            { name: 'Тяга гантелей в наклоне', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Выпады', sets: '3', reps: '12 на ногу', rest: '60 сек' },
            { name: 'Планка', sets: '3', reps: '30-45 сек', rest: '45 сек' }
          ]
        },
        {
          day: 'Среда - Функциональный тренинг',
          exercises: [
            { name: 'Берпи', sets: '3', reps: '10-12', rest: '60 сек' },
            { name: 'Приседания с прыжком', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Отжимания + подъем руки', sets: '3', reps: '10 на сторону', rest: '60 сек' },
            { name: 'Альпинист', sets: '3', reps: '20-30 сек', rest: '45 сек' },
            { name: 'Боковая планка', sets: '3', reps: '30 сек на сторону', rest: '45 сек' }
          ]
        },
        {
          day: 'Пятница - Фулбоди + Кардио',
          exercises: [
            { name: 'Становая тяга с гантелями', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Жим гантелей на скамье', sets: '3', reps: '12-15', rest: '60 сек' },
            { name: 'Подтягивания (или тяга)', sets: '3', reps: '8-12', rest: '60 сек' },
            { name: 'Махи гантелями', sets: '3', reps: '15-20', rest: '45 сек' },
            { name: 'Кардио интервалы', sets: '1', reps: '15-20 мин', rest: '-' }
          ]
        }
      ],
      nutrition: {
        dailyCalories: '2000-2400 ккал (поддержание)',
        protein: '1.6-2 г/кг веса',
        carbs: '3-4 г/кг веса',
        fats: '1 г/кг веса',
        caloriesBurned: '300-500 ккал за тренировку'
      },
      recommendations: [
        'Сбалансированное питание без экстремального дефицита',
        'Регулярность важнее интенсивности',
        'Добавьте активность в повседневную жизнь (ходьба 10000 шагов)',
        'Пейте достаточно воды (2-2.5 литра)',
        'Разнообразьте тренировки: йога, плавание, танцы',
        'Сосредоточьтесь на формировании привычек'
      ]
    }
  ]

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Готовые программы тренировок</h1>
          <p className="text-gray-400">Выберите программу под свою цель</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('standard')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === 'standard'
                ? 'text-primary-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Dumbbell className="inline mr-2" size={20} />
            Базовые тренировки
            {activeTab === 'standard' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === 'goals'
                ? 'text-primary-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Target className="inline mr-2" size={20} />
            Программы по целям
            {activeTab === 'goals' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"></div>
            )}
          </button>
        </div>

                {/* Standard Programs */}
        {activeTab === 'standard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardPrograms.map((program) => (
              <div key={program.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center text-2xl`}>
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{program.title}</h3>
                      <p className="text-gray-400 text-sm">{program.description}</p>
                    </div>
                  </div>
                  {/* <button
                    onClick={() => toggleProgram(program.id)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                  >
                    {expandedProgram === program.id ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button> */}
                </div>


                    {/* expandedProgram === program.id && если нужна будет стрелка вставить этот код в строчку ниэе переж круглой скобкой */} 
                { (
                  <div className="mt-4 space-y-4 border-t border-dark-border pt-4">
                    {/* Day-by-day exercises */}
                    {program.program.map((day, idx) => (
                      <div key={idx}>
                        <h4 className="text-white font-semibold mb-3">{day.day}</h4>
                        <div className="space-y-2">
                          {day.exercises.map((exercise, exIdx) => (
                            <div key={exIdx} className="bg-dark-bg rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <span className="text-gray-200 font-medium">{exercise.name}</span>
                                <div className="text-right text-sm">
                                  <div className="text-primary-400">{exercise.sets} x {exercise.reps}</div>
                                  <div className="text-gray-500">Отдых: {exercise.rest}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Nutrition (если есть) */}
                    {program.nutrition?.caloriesBurned && (
                      <div className="bg-dark-bg rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">
                            <Flame className="inline mr-1" size={14} />
                            Расход за тренировку:
                          </span>
                          <span className="text-orange-400 font-semibold">{program.nutrition.caloriesBurned}</span>
                        </div>
                      </div>
                    )}

                    {/* Recommendations (если есть) */}
                    {program.recommendations && program.recommendations.length > 0 && (
                      <div className="bg-dark-bg rounded-lg p-5">
                        <div className="flex items-center mb-4">
                          <TrendingUp className="text-primary-500 mr-2" size={24} />
                          <h4 className="text-lg font-bold text-white">Рекомендации</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {program.recommendations.map((rec, rIdx) => (
                            <li key={rIdx} className="flex items-start text-gray-300">
                              <span className="text-primary-400 mr-2 flex-shrink-0">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Weekly program — отображаем только если поле есть (у стандартной программы может не быть weeklyProgram) */}
                    {(((program as any).weeklyProgram as DayProgram[] | undefined)?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Calendar className="text-purple-500 mr-2" size={24} />
                      <h4 className="text-lg font-bold text-white">Недельная программа</h4>
                    </div>
                        <div className="space-y-4">
                          {((program as any).weeklyProgram as DayProgram[]).map((wDay, wIdx) => (
                            <div key={wIdx} className="bg-dark-bg rounded-lg p-4">
                              <h5 className="text-white font-semibold mb-3 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm mr-3">
                                  {wIdx + 1}
                                </span>
                                {wDay.day}
                              </h5>
                              <div className="space-y-2">
                                {wDay.exercises.map((exercise, exIdx) => (
                                  <div key={exIdx} className="bg-dark-card rounded-lg p-3">
                                    <div className="flex justify-between items-start">
                                      <span className="text-gray-200 font-medium flex-1">{exercise.name}</span>
                                      <div className="text-right text-sm ml-4">
                                        <div className="text-primary-400 font-semibold">{exercise.sets} x {exercise.reps}</div>
                                        {exercise.rest !== '-' && (
                                          <div className="text-gray-500 text-xs">Отдых: {exercise.rest}</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Goal Programs */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            {goalPrograms.map((program) => (
              <div key={program.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                      {program.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">{program.title}</h3>
                      <p className="text-gray-400">{program.description}</p>
                      <p className="text-primary-400 text-sm mt-1">Длительность: {program.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleProgram(program.id)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors flex-shrink-0"
                  >
                    {expandedProgram === program.id ? (
                      <ChevronUp className="text-gray-400" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </button>
                </div>

                {expandedProgram === program.id && (
                  <div className="mt-4 space-y-4 border-t border-dark-border pt-4">
                    {program.weeklyProgram.map((day, idx) => (
                      <div key={idx}>
                        <h4 className="text-white font-semibold mb-3">{day.day}</h4>
                        <div className="space-y-2">
                          {day.exercises.map((exercise, exIdx) => (
                            <div key={exIdx} className="bg-dark-bg rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <span className="text-gray-200 font-medium">{exercise.name}</span>
                                <div className="text-right text-sm">
                                  <div className="text-primary-400">{exercise.sets} x {exercise.reps}</div>
                                  <div className="text-gray-500">Отдых: {exercise.rest}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Nutrition */}
                    <div className="bg-dark-bg rounded-lg p-4">
                      <h4 className="text-lg font-bold text-white mb-2">Питание</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Калории: {program.nutrition.dailyCalories}</li>
                        <li>Белки: {program.nutrition.protein}</li>
                        <li>Углеводы: {program.nutrition.carbs}</li>
                        <li>Жиры: {program.nutrition.fats}</li>
                        <li>Расход за тренировку: {program.nutrition.caloriesBurned}</li>
                      </ul>
                    </div>

                    {/* Recommendations */}
                    {program.recommendations && program.recommendations.length > 0 && (
                      <div className="bg-dark-bg rounded-lg p-5">
                        <div className="flex items-center mb-4">
                          <TrendingUp className="text-primary-500 mr-2" size={24} />
                          <h4 className="text-lg font-bold text-white">Рекомендации</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {program.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start text-gray-300">
                              <span className="text-primary-400 mr-2 flex-shrink-0">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramBuilder