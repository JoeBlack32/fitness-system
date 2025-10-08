import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Lightning from '../components/Lightning'
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Lightning Background */}
      <div className="absolute inset-0 w-full h-full">
        <Lightning
          hue={230}
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
          <p className="text-gray-200 mt-2 drop-shadow-md">Войдите в свой аккаунт</p>
        </div>

        {/* Login Form */}
        <div className="card shadow-2xl backdrop-blur-sm bg-dark-card/90">
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