import { useState, useEffect } from 'react'
import { Plus, Dumbbell, Calendar, ChevronRight, Trash2 } from 'lucide-react'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import { useWorkouts } from '../hooks/useWorkouts'
import { Exercise, CreateWorkoutData } from '../types'

const WorkoutLog = () => {
  const { workouts, loading, createWorkout, deleteWorkout, setWorkouts } = useWorkouts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

  // Загрузка из localStorage при монтировании (временное решение до подключения API)
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts')
    if (savedWorkouts) {
      try {
        setWorkouts(JSON.parse(savedWorkouts))
      } catch (error) {
        console.error('Error loading workouts:', error)
      }
    }
  }, [])

  // Сохранение в localStorage при изменении (временное решение)
  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('workouts', JSON.stringify(workouts))
    }
  }, [workouts])

  const muscleGroups = [
    { id: 'chest', name: 'Грудь', icon: '💪', color: 'from-blue-500 to-blue-600' },
    { id: 'back', name: 'Спина и плечи', icon: '🔥', color: 'from-purple-500 to-purple-600' },
    { id: 'arms', name: 'Руки', icon: '💪', color: 'from-green-500 to-green-600' },
    { id: 'legs', name: 'Ноги', icon: '🦵', color: 'from-orange-500 to-orange-600' }
  ]

  const exercisesByGroup: Record<string, string[]> = {
    chest: [
      'Жим штанги лежа',
      'Жим гантелей на наклонной',
      'Разводка гантелей',
      'Отжимания на брусьях',
      'Кроссовер на блоках',
      'Пуловер с гантелью',
      'Жим в хаммере'
    ],
    back: [
      'Подтягивания',
      'Тяга штанги в наклоне',
      'Тяга верхнего блока',
      'Тяга гантели в наклоне',
      'Жим штанги стоя',
      'Махи гантелями в стороны',
      'Шраги со штангой',
      'Тяга к подбородку'
    ],
    arms: [
      'Подъем штанги на бицепс',
      'Молотки с гантелями',
      'Подъем на скамье Скотта',
      'Французский жим лежа',
      'Разгибания на блоке',
      'Жим узким хватом',
      'Концентрированный подъем'
    ],
    legs: [
      'Приседания со штангой',
      'Жим ногами',
      'Румынская тяга',
      'Выпады с гантелями',
      'Разгибания ног',
      'Сгибания ног',
      'Подъем на носки стоя',
      'Приседания в гакк-машине'
    ]
  }

  const daysOfWeek = [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ]

  const setsOptions = [5, 10, 15]

  const handleOpenModal = (groupId: string) => {
    setSelectedGroup(groupId)
    setSelectedDate(new Date().toISOString().split('T')[0])
    setSelectedDay(daysOfWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1])
    setSelectedExercises([])
    setIsModalOpen(true)
  }

  const handleExerciseToggle = (exerciseName: string) => {
    const exists = selectedExercises.find(e => e.name === exerciseName)
    if (exists) {
      setSelectedExercises(selectedExercises.filter(e => e.name !== exerciseName))
    } else {
      setSelectedExercises([...selectedExercises, { 
        id: Date.now().toString(), 
        name: exerciseName, 
        sets: 10 
      }])
    }
  }

  const handleSetsChange = (exerciseName: string, sets: number) => {
    setSelectedExercises(
      selectedExercises.map(e => 
        e.name === exerciseName ? { ...e, sets } : e
      )
    )
  }

  const handleSaveWorkout = async () => {
    if (selectedExercises.length === 0) {
      alert('Выберите хотя бы одно упражнение')
      return
    }

    // Подготовка данных для API
    const workoutData: CreateWorkoutData = {
      muscleGroup: selectedGroup,
      date: selectedDate,
      dayOfWeek: selectedDay,
      exercises: selectedExercises.map(e => ({
        name: e.name,
        sets: e.sets,
        reps: 0, // можно добавить в будущем
      }))
    }

    // Попытка отправить на сервер
    const result = await createWorkout(workoutData)

    // Если API не работает (нет бэкенда), сохраняем локально
    if (!result.success) {
      // Создаем тренировку локально
      const localWorkout = {
        id: Date.now().toString(),
        muscleGroup: selectedGroup,
        date: selectedDate,
        dayOfWeek: selectedDay,
        exercises: selectedExercises,
        createdAt: new Date().toISOString()
      }
      
      setWorkouts([localWorkout, ...workouts])
    }

    setIsModalOpen(false)
    setSelectedExercises([])
  }

  const handleDeleteWorkout = async (id: string) => {
    if (!window.confirm('Удалить эту тренировку?')) return
    
    // Пытаемся удалить через API
    const result = await deleteWorkout(id)
    
    // Если API не работает, удаляем локально
    if (!result.success) {
      setWorkouts(workouts.filter(w => w.id !== id))
    }
  }

  const getGroupName = (groupId: string) => {
    return muscleGroups.find(g => g.id === groupId)?.name || groupId
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Журнал тренировок</h1>
            <p className="text-gray-400">Выберите группу мышц и запишите тренировку</p>
          </div>
        </div>

        {/* Группы мышц */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {muscleGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleOpenModal(group.id)}
              className="card hover:scale-105 transition-transform cursor-pointer text-left"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-3xl mb-4`}>
                {group.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
              <div className="flex items-center text-primary-400 text-sm font-semibold">
                <Plus size={16} className="mr-1" />
                Добавить тренировку
              </div>
            </button>
          ))}
        </div>

        {/* История тренировок */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">История тренировок</h2>
            <Dumbbell className="text-primary-500" size={28} />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <p>Загрузка...</p>
            </div>
          ) : workouts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Dumbbell size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Пока нет записей</p>
              <p className="text-sm mt-2">Начните свою первую тренировку!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workouts.map((session) => (
                <div key={session.id} className="bg-dark-bg rounded-lg p-5 hover:bg-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {getGroupName(session.muscleGroup)}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm space-x-4">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(session.date).toLocaleDateString('ru-RU')}
                        </div>
                        <span>{session.dayOfWeek}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeleteWorkout(session.id!)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {session.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{exercise.name}</span>
                        <span className="text-primary-400 font-semibold">{exercise.sets} подходов</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Тренировка: ${muscleGroups.find(g => g.id === selectedGroup)?.name}`}
        size="lg"
      >
        <div className="space-y-6">
          {/* Дата и день недели */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Дата</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">День недели</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="input-field"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Упражнения */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Выберите упражнения (минимум 1)
            </label>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {exercisesByGroup[selectedGroup]?.map((exercise) => {
                const isSelected = selectedExercises.find(e => e.name === exercise)
                return (
                  <div key={exercise} className="bg-dark-bg rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={!!isSelected}
                          onChange={() => handleExerciseToggle(exercise)}
                          className="w-5 h-5 rounded border-dark-border text-primary-600 focus:ring-primary-500 mr-3"
                        />
                        <span className="text-white font-medium">{exercise}</span>
                      </label>
                    </div>
                    
                    {isSelected && (
                      <div className="ml-8">
                        <p className="text-sm text-gray-400 mb-2">Количество подходов:</p>
                        <div className="flex gap-2">
                          {setsOptions.map(sets => (
                            <button
                              key={sets}
                              onClick={() => handleSetsChange(exercise, sets)}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                isSelected.sets === sets
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-dark-card text-gray-400 hover:bg-slate-700'
                              }`}
                            >
                              {sets}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSaveWorkout} fullWidth disabled={loading}>
              {loading ? 'Сохранение...' : `Сохранить тренировку (${selectedExercises.length})`}
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default WorkoutLog