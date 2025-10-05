import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Activity, TrendingUp, Calendar, Award } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'Всего тренировок', value: '0', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { label: 'Этот месяц', value: '0', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Прогресс', value: '0%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Достижения', value: '0', icon: Award, color: 'from-orange-500 to-orange-600' },
  ]

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

        {/* Quick Actions */}
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
            <div className="text-center py-12 text-gray-400">
              <p>Пока нет записей</p>
              <p className="text-sm mt-2">Начните свою первую тренировку!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard