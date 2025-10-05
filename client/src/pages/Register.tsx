import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl mb-4">
            <Dumbbell className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold gradient-text">FitnessPro</h1>
          <p className="text-gray-400 mt-2">Создайте свой аккаунт</p>
        </div>

        {/* Register Form */}
        <div className="card">
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