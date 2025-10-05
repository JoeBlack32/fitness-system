import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { Mail, Lock, Dumbbell } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password)
    
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
          <p className="text-gray-400 mt-2">Войдите в свой аккаунт</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={Mail}
            />

            <Input
              type="password"
              label="Пароль"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={Lock}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                Запомнить меня
              </label>
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Забыли пароль?
              </a>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-semibold">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login