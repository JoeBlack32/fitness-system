import { useState, useEffect } from 'react'
import { Scale, TrendingUp, Apple, Calculator, Target, Calendar, Plus, Trash2 } from 'lucide-react'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import { useNutrition } from '../hooks/useNutrition'

// Типы
interface Product {
  name: string
  category: string
  calories: number
  protein: number
  carbs: number
  fats: number
  serving: string
}

const Nutrition = () => {
  const { 
    profile, 
    weightLogs, 
    loading, 
    fetchProfile, 
    saveProfile, 
    fetchWeightLogs, 
    addWeightLog, 
    deleteWeightLog 
  } = useNutrition()

  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false)

  // Form states
  const [height, setHeight] = useState('')
  const [targetWeight, setTargetWeight] = useState('')
  const [goal, setGoal] = useState<'loss' | 'gain' | 'maintain'>('maintain')
  const [activityLevel, setActivityLevel] = useState(1.55)

  // Log form
  const [logDate, setLogDate] = useState('')
  const [logWeight, setLogWeight] = useState('')
  const [logCalories, setLogCalories] = useState('')

  // Calculator
  const [calcProducts, setCalcProducts] = useState<{product: Product, amount: number}[]>([])

  // Загрузка данных при монтировании
  useEffect(() => {
    fetchProfile()
    fetchWeightLogs()
  }, [])

  // База продуктов
  const productDatabase: Product[] = [
    { name: 'Куриная грудка', category: 'Белки', calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: '100г' },
    { name: 'Яйца', category: 'Белки', calories: 155, protein: 13, carbs: 1.1, fats: 11, serving: '100г' },
    { name: 'Творог 5%', category: 'Белки', calories: 121, protein: 16.7, carbs: 1.8, fats: 5, serving: '100г' },
    { name: 'Лосось', category: 'Белки', calories: 208, protein: 20, carbs: 0, fats: 13, serving: '100г' },
    { name: 'Протеин (порошок)', category: 'Белки', calories: 120, protein: 24, carbs: 3, fats: 1.5, serving: '30г' },
    { name: 'Рис (вареный)', category: 'Углеводы', calories: 130, protein: 2.7, carbs: 28, fats: 0.3, serving: '100г' },
    { name: 'Гречка (вареная)', category: 'Углеводы', calories: 123, protein: 4.2, carbs: 25, fats: 1.6, serving: '100г' },
    { name: 'Овсянка', category: 'Углеводы', calories: 68, protein: 2.4, carbs: 12, fats: 1.4, serving: '100г' },
    { name: 'Банан', category: 'Углеводы', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, serving: '100г' },
    { name: 'Батат', category: 'Углеводы', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, serving: '100г' },
    { name: 'Орехи грецкие', category: 'Жиры', calories: 654, protein: 15, carbs: 14, fats: 65, serving: '100г' },
    { name: 'Авокадо', category: 'Жиры', calories: 160, protein: 2, carbs: 9, fats: 15, serving: '100г' },
    { name: 'Оливковое масло', category: 'Жиры', calories: 884, protein: 0, carbs: 0, fats: 100, serving: '100г' },
    { name: 'Арахисовая паста', category: 'Жиры', calories: 588, protein: 25, carbs: 20, fats: 50, serving: '100г' },
    { name: 'Брокколи', category: 'Овощи', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, serving: '100г' },
    { name: 'Шпинат', category: 'Овощи', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, serving: '100г' },
  ]

  // Расчет ИМТ
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  // Расчет базового метаболизма
  const calculateBMR = (weight: number, height: number) => {
    return 10 * weight + 6.25 * height - 5 * 25 + 5
  }

  // Рекомендуемые калории
  const calculateRecommendedCalories = (weight: number, height: number, activityLevel: number, goal: string) => {
    const bmr = calculateBMR(weight, height)
    const tdee = bmr * activityLevel
    
    if (goal === 'loss') return Math.round(tdee - 500)
    if (goal === 'gain') return Math.round(tdee + 300)
    return Math.round(tdee)
  }

  // Рекомендации по ИМТ
  const getBMIRecommendation = (bmi: number) => {
    if (bmi < 18.5) return {
      status: 'Недостаточный вес',
      color: 'text-yellow-400',
      advice: 'Увеличь калорийность питания на 300-500 ккал. Добавь больше белков и сложных углеводов.'
    }
    if (bmi >= 18.5 && bmi < 25) return {
      status: 'Нормальный вес',
      color: 'text-green-400',
      advice: 'Отлично! Продолжай в том же духе. Поддерживай текущий рацион и тренировки.'
    }
    if (bmi >= 25 && bmi < 30) return {
      status: 'Избыточный вес',
      color: 'text-orange-400',
      advice: 'Снизь калорийность на 300-500 ккал. Увеличь кардио и контролируй порции.'
    }
    return {
      status: 'Ожирение',
      color: 'text-red-400',
      advice: 'Рекомендуется снизить калорийность и проконсультироваться со специалистом.'
    }
  }

  // Сохранение профиля
  const handleSaveProfile = async () => {
    if (!height || !targetWeight) {
      alert('Заполните все поля')
      return
    }

    const result = await saveProfile({
      height: parseFloat(height),
      targetWeight: parseFloat(targetWeight),
      goal,
      activityLevel
    })

    if (result.success) {
      setIsProfileModalOpen(false)
    }
  }

  // Открытие модалки редактирования профиля
  const handleOpenEditProfile = () => {
    if (profile) {
      setHeight(profile.height.toString())
      setTargetWeight(profile.targetWeight.toString())
      setGoal(profile.goal)
      setActivityLevel(profile.activityLevel)
    }
    setIsProfileModalOpen(true)
  }

  // Добавление записи веса
  const handleAddLog = async () => {
    if (!logDate || !logWeight || !logCalories) {
      alert('Заполните все поля')
      return
    }

    const result = await addWeightLog({
      date: logDate,
      weight: parseFloat(logWeight),
      calories: parseFloat(logCalories)
    })

    if (result.success) {
      setLogDate('')
      setLogWeight('')
      setLogCalories('')
      setIsLogModalOpen(false)
    }
  }

  // Удаление записи
  const handleDeleteLog = async (date: string) => {
    if (window.confirm('Удалить эту запись?')) {
      await deleteWeightLog(date)
    }
  }

  // Калькулятор калорий
  const addProductToCalc = (product: Product) => {
    setCalcProducts([...calcProducts, { product, amount: 100 }])
  }

  const updateProductAmount = (index: number, amount: number) => {
    const updated = [...calcProducts]
    updated[index].amount = amount
    setCalcProducts(updated)
  }

  const removeFromCalc = (index: number) => {
    setCalcProducts(calcProducts.filter((_, i) => i !== index))
  }

  const getTotalCalories = () => {
    return calcProducts.reduce((sum, item) => {
      return sum + (item.product.calories * item.amount / 100)
    }, 0)
  }

  const clearCalculator = () => {
    setCalcProducts([])
  }

  // Текущий вес и ИМТ
  const currentWeight = weightLogs.length > 0 ? weightLogs[0].weight : null
  const currentBMI = currentWeight && profile ? calculateBMI(currentWeight, profile.height) : null
  const bmiRecommendation = currentBMI ? getBMIRecommendation(currentBMI) : null

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Питание и вес</h1>
            <p className="text-gray-400">Контролируй питание и достигай своих целей</p>
          </div>
          {!profile && (
            <Button onClick={() => setIsProfileModalOpen(true)}>
              <Target size={18} className="mr-2" />
              Создать профиль
            </Button>
          )}
        </div>

        {loading && !profile && !weightLogs.length ? (
          <div className="card text-center py-16">
            <div className="text-gray-400">Загрузка...</div>
          </div>
        ) : !profile ? (
          // Приглашение создать профиль
          <div className="card text-center py-16">
            <Target size={64} className="mx-auto mb-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-white mb-4">Создайте профиль питания</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Укажите свои параметры, чтобы получать персонализированные рекомендации по питанию
            </p>
            <Button onClick={() => setIsProfileModalOpen(true)}>
              Начать
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Текущий вес */}
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Текущий вес</span>
                  <Scale className="text-blue-500" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">
                  {currentWeight ? `${currentWeight} кг` : '—'}
                </p>
              </div>

              {/* ИМТ */}
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">ИМТ</span>
                  <TrendingUp className="text-purple-500" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">
                  {currentBMI ? currentBMI.toFixed(1) : '—'}
                </p>
                {bmiRecommendation && (
                  <p className={`text-xs mt-1 ${bmiRecommendation.color}`}>
                    {bmiRecommendation.status}
                  </p>
                )}
              </div>

              {/* Целевой вес */}
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Цель</span>
                  <Target className="text-green-500" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">
                  {profile.targetWeight} кг
                </p>
              </div>

              {/* Рекомендуемые калории */}
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Норма ккал</span>
                  <Apple className="text-orange-500" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">
                  {currentWeight 
                    ? calculateRecommendedCalories(currentWeight, profile.height, profile.activityLevel, profile.goal)
                    : '—'}
                </p>
              </div>
            </div>

            {/* Рекомендации */}
            {bmiRecommendation && (
              <div className="card mb-8 bg-gradient-to-r from-primary-600/20 to-purple-600/20 border-primary-500/50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Рекомендация</h3>
                    <p className="text-gray-300">{bmiRecommendation.advice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="card hover:scale-105 transition-transform text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Plus size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Добавить запись</h3>
                <p className="text-gray-400 text-sm">Вес и калории за день</p>
              </button>

              <button
                onClick={() => setIsCalcModalOpen(true)}
                className="card hover:scale-105 transition-transform text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Calculator size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Калькулятор</h3>
                <p className="text-gray-400 text-sm">Посчитать калории блюда</p>
              </button>

              <button
                onClick={handleOpenEditProfile}
                className="card hover:scale-105 transition-transform text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Target size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Изменить цель</h3>
                <p className="text-gray-400 text-sm">Обновить профиль</p>
              </button>
            </div>

            {/* История записей */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">История измерений</h2>
                <Calendar className="text-primary-500" size={28} />
              </div>

              {loading && weightLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>Загрузка...</p>
                </div>
              ) : weightLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Scale size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Пока нет записей</p>
                  <p className="text-sm mt-2">Добавьте первое измерение</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {weightLogs.map((log) => (
                    <div key={log.id} className="bg-dark-bg rounded-lg p-4 flex items-center justify-between hover:bg-slate-800 transition-colors">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                          <Calendar className="text-primary-500" size={20} />
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {new Date(log.date).toLocaleDateString('ru-RU', { 
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Вес: {log.weight} кг • Калории: {log.calories} ккал
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteLog(log.date)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Модальное окно профиля */}
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title={profile ? "Изменить профиль" : "Создать профиль питания"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Рост (см)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-field"
                placeholder="175"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Целевой вес (кг)
              </label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="input-field"
                placeholder="75"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Цель
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="input-field"
              >
                <option value="loss">Похудение</option>
                <option value="maintain">Поддержание</option>
                <option value="gain">Набор массы</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Уровень активности
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                className="input-field"
              >
                <option value="1.2">Минимальная (сидячий образ жизни)</option>
                <option value="1.375">Низкая (1-3 тренировки в неделю)</option>
                <option value="1.55">Средняя (3-5 тренировок в неделю)</option>
                <option value="1.725">Высокая (6-7 тренировок в неделю)</option>
                <option value="1.9">Очень высокая (2 раза в день)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveProfile} fullWidth disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button onClick={() => setIsProfileModalOpen(false)} variant="secondary">
                Отмена
              </Button>
            </div>
          </div>
        </Modal>

        {/* Модальное окно добавления записи */}
        <Modal
          isOpen={isLogModalOpen}
          onClose={() => setIsLogModalOpen(false)}
          title="Добавить измерение"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Дата
              </label>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Вес (кг)
              </label>
              <input
                type="number"
                step="0.1"
                value={logWeight}
                onChange={(e) => setLogWeight(e.target.value)}
                className="input-field"
                placeholder="75.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Калории за день
              </label>
              <input
                type="number"
                value={logCalories}
                onChange={(e) => setLogCalories(e.target.value)}
                className="input-field"
                placeholder="2000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Используйте калькулятор, если не знаете точное значение
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleAddLog} fullWidth disabled={loading}>
                {loading ? 'Добавление...' : 'Добавить'}
              </Button>
              <Button onClick={() => setIsLogModalOpen(false)} variant="secondary">
                Отмена
              </Button>
            </div>
          </div>
        </Modal>

        {/* Модальное окно калькулятора */}
        <Modal
          isOpen={isCalcModalOpen}
          onClose={() => setIsCalcModalOpen(false)}
          title="Калькулятор калорий"
          size="lg"
        >
          <div className="space-y-6">
            {/* Выбор продуктов */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                База продуктов
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                {productDatabase.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => addProductToCalc(product)}
                    className="text-left p-3 bg-dark-bg rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <p className="text-white font-medium text-sm">{product.name}</p>
                    <p className="text-gray-400 text-xs">
                      {product.calories} ккал / {product.serving}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Выбранные продукты */}
            {calcProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Ваше блюдо
                  </label>
                  <button
                    onClick={clearCalculator}
                    className="text-sm text-primary-400 hover:text-primary-300"
                  >
                    Очистить всё
                  </button>
                </div>
                <div className="space-y-2">
                  {calcProducts.map((item, index) => (
                    <div key={index} className="bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.product.name}</span>
                        <button
                          onClick={() => removeFromCalc(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) => updateProductAmount(index, parseFloat(e.target.value) || 0)}
                          className="input-field w-24"
                          placeholder="100"
                        />
                        <span className="text-gray-400 text-sm">грамм</span>
                        <span className="text-primary-400 font-semibold ml-auto">
                          {Math.round(item.product.calories * item.amount / 100)} ккал
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Итого */}
            <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-lg">Всего калорий:</span>
                <span className="text-primary-400 font-bold text-2xl">
                  {Math.round(getTotalCalories())} ккал
                </span>
              </div>
            </div>

            <Button onClick={() => setIsCalcModalOpen(false)} fullWidth>
              Закрыть
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Nutrition