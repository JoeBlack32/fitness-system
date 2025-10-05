import { Link } from 'react-router-dom'
import { Dumbbell, TrendingUp, Target, Calendar, Apple, BarChart3, Zap, Award, Users } from 'lucide-react'
import Button from '../components/UI/Button'

const Landing = () => {
  const features = [
    {
      icon: Dumbbell,
      title: 'Трекинг тренировок',
      description: 'Записывайте каждое упражнение, подход и результат. Отслеживайте свой прогресс в реальном времени.'
    },
    {
      icon: Calendar,
      title: 'Умные программы',
      description: 'Создавайте персонализированные программы тренировок или используйте готовые от профессионалов.'
    },
    {
      icon: Apple,
      title: 'Контроль питания',
      description: 'Следите за калориями, белками, жирами и углеводами. Достигайте целей быстрее.'
    },
    {
      icon: BarChart3,
      title: 'Детальная аналитика',
      description: 'Визуализация прогресса через графики и диаграммы. Принимайте решения на основе данных.'
    },
    {
      icon: Target,
      title: 'Постановка целей',
      description: 'Определяйте цели и отслеживайте их достижение. Мотивация на каждом шаге.'
    },
    {
      icon: Zap,
      title: 'AI-рекомендации',
      description: 'Интеллектуальные советы по тренировкам и питанию на основе ваших данных.'
    }
  ]

  const stats = [
    { icon: Users, value: '10,000+', label: 'Активных пользователей' },
    { icon: Dumbbell, value: '500,000+', label: 'Записанных тренировок' },
    { icon: Award, value: '95%', label: 'Достигли целей' },
    { icon: TrendingUp, value: '4.8/5', label: 'Средняя оценка' }
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-purple-600/20 to-dark-bg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl mb-8 animate-fade-in">
              <Dumbbell className="text-white" size={40} />
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              Твой путь к{' '}
              <span className="gradient-text">идеальной форме</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in">
              Интеллектуальная система управления тренировками и спортивным прогрессом. 
              Достигайте целей быстрее с помощью умных технологий и персонализированного подхода.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/register">
                <Button className="min-w-[200px]">
                  Начать бесплатно
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="min-w-[200px]">
                  Войти в аккаунт
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <p className="mt-8 text-gray-400 text-sm">
              ✓ Бесплатная регистрация • ✓ Без кредитной карты • ✓ Доступ ко всем функциям
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-card border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="w-10 h-10 mx-auto mb-4 text-primary-500" />
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Всё что нужно для достижения целей
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Мощные инструменты для тренировок, питания и анализа прогресса в одном приложении
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index} 
                  className="card hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-400">
              Три простых шага к вашим целям
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Зарегистрируйтесь</h3>
              <p className="text-gray-400">
                Создайте бесплатный аккаунт за 30 секунд
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Поставьте цели</h3>
              <p className="text-gray-400">
                Определите что хотите достичь
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Тренируйтесь</h3>
              <p className="text-gray-400">
                Следуйте плану и отслеживайте прогресс
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-r from-primary-600 to-purple-600 border-none">
            <h2 className="text-4xl font-bold text-white mb-4">
              Готовы начать трансформацию?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Присоединяйтесь к тысячам пользователей, которые уже достигли своих целей
            </p>
            <Link to="/register">
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 min-w-[250px]">
                Начать бесплатно →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-dark-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Dumbbell className="text-primary-500" size={24} />
              <span className="text-xl font-bold gradient-text">FitnessPro</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 FitnessPro. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing