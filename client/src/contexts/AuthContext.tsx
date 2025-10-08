import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'
import { User, RegisterData } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Invalid user data:', error)
        // Очищаем невалидные данные
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      const { token, user: userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      toast.success(`Добро пожаловать, ${userData.name}!`)
      return { success: true }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ошибка авторизации'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      // Проверка совпадения паролей на клиенте
      if (userData.password !== userData.confirmPassword) {
        toast.error('Пароли не совпадают')
        return { success: false, error: 'Пароли не совпадают' }
      }

      // authService.register сам извлечёт нужные поля
      const response = await authService.register(userData)
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      
      toast.success(`Добро пожаловать, ${user.name}!`)
      return { success: true }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ошибка регистрации'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Вы вышли из системы')
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  }

  // ВАЖНО: Ждём пока загрузится информация о пользователе
  // Это предотвращает "мигание" Landing страницы при перезагрузке
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}