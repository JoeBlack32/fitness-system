import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Lightning from '../components/Lightning'
import { Mail, Lock, User, Dumbbell } from 'lucide-react'
import { RegisterData } from '../types'

const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }

    setLoading(true)
    const result = await register(formData)
    
    if (result.success) {
      navigate('/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Lightning Background */}
      <div className="absolute inset-0 w-full h-full">
        <Lightning
          hue={270}
          xOffset={0}
          speed={0.4}
          intensity={0.7}
          size={1}
        />
      </div>

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-dark-bg/50"></div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl mb-4 shadow-2xl">
            <Dumbbell className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold gradient-text drop-shadow-lg">FitnessPro</h1>
          <p className="text-gray-200 mt-2 drop-shadow-md">Создайте свой аккаунт</p>
        </div>

        {/* Register Form */}
        <div className="card shadow-2xl backdrop-blur-sm bg-dark-card/90">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="name"
              label="Имя"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={handleChange}
              required
              icon={User}
            />

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
            />

            <Input
              type="password"
              name="password"
              label="Пароль"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              icon={Lock}
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Подтвердите пароль"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              icon={Lock}
            />

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register