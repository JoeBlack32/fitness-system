import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Activity, TrendingUp, Calendar, Award, Dumbbell } from 'lucide-react'
import { useWorkouts } from '../hooks/useWorkouts'
import Lightning from '../components/Lightning'

const Dashboard = () => {
  const { user } = useAuth()
  const { workouts, fetchRecentWorkouts, loading } = useWorkouts()
  const [totalWorkouts, setTotalWorkouts] = useState(0)
  const [monthWorkouts, setMonthWorkouts] = useState(0)

  useEffect(() => {
    // Загружаем последние тренировки из API
    fetchRecentWorkouts(1) // получаем только последнюю тренировку
  }, [])

  useEffect(() => {
    if (workouts.length > 0) {
      // Подсчитываем статистику из загруженных данных
      setTotalWorkouts(workouts.length)
      
      // Подсчитываем тренировки за текущий месяц
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const monthCount = workouts.filter(w => {
        const workoutDate = new Date(w.date)
        return workoutDate.getMonth() === currentMonth && 
               workoutDate.getFullYear() === currentYear
      }).length
      setMonthWorkouts(monthCount)
    }
  }, [workouts])

  const stats = [
    { label: 'Всего тренировок', value: totalWorkouts.toString(), icon: Activity, color: 'from-blue-500 to-blue-600' },
    { label: 'Этот месяц', value: monthWorkouts.toString(), icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Прогресс', value: '0%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Достижения', value: '0', icon: Award, color: 'from-orange-500 to-orange-600' },
  ]

  const muscleGroupNames: Record<string, string> = {
    chest: 'Грудь',
    back: 'Спина и плечи',
    arms: 'Руки',
    legs: 'Ноги'
  }

  const muscleGroupEmojis: Record<string, string> = {
    chest: '💪',
    back: '🔥',
    arms: '💪',
    legs: '🦵'
  }

  // Последняя тренировка - это первый элемент массива
  const recentWorkout = workouts.length > 0 ? workouts[0] : null

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Добро пожаловать, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">
            Готовы к новым достижениям? Начните тренировку прямо сейчас!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Быстрые действия</h2>
            <div className="space-y-3">
              <Link to="/workouts" className="block p-4 bg-dark-bg rounded-lg hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white">Начать тренировку</p>
                <p className="text-sm text-gray-400">Запишите новую тренировку</p>
              </Link>
              <Link to="/programs" className="block p-4 bg-dark-bg rounded-lg hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white">Создать программу</p>
                <p className="text-sm text-gray-400">Постройте план тренировок</p>
              </Link>
              <Link to="/nutrition" className="block p-4 bg-dark-bg rounded-lg hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white">Добавить прием пищи</p>
                <p className="text-sm text-gray-400">Трекинг калорий и макросов</p>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Последняя активность</h2>
            {loading ? (
              <div className="text-center py-12 text-gray-400">
                <p>Загрузка...</p>
              </div>
            ) : recentWorkout ? (
              <div className="bg-dark-bg rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {muscleGroupEmojis[recentWorkout.muscleGroup] || '💪'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {muscleGroupNames[recentWorkout.muscleGroup] || recentWorkout.muscleGroup}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm space-x-3">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(recentWorkout.date).toLocaleDateString('ru-RU')}
                        </div>
                        <span>{recentWorkout.dayOfWeek}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <p className="text-sm text-gray-400 mb-2">Упражнения:</p>
                  {recentWorkout.exercises.slice(0, 3).map((exercise, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-slate-800/50 rounded px-3 py-2">
                      <span className="text-gray-300">{exercise.name}</span>
                      <span className="text-primary-400 font-semibold">{exercise.sets} подходов</span>
                    </div>
                  ))}
                  {recentWorkout.exercises.length > 3 && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      +{recentWorkout.exercises.length - 3} упражнений
                    </p>
                  )}
                </div>

                <Link 
                  to="/workouts" 
                  className="mt-4 block text-center text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
                >
                  Посмотреть все тренировки →
                </Link>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Dumbbell size={48} className="mx-auto mb-4 opacity-50" />
                <p>Пока нет записей</p>
                <p className="text-sm mt-2">Начните свою первую тренировку!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard