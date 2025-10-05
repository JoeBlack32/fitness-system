import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'
import { User, LoginCredentials, RegisterData } from '../types'

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
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Invalid user data:', error)
        logout()
      }
    }
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    // ВРЕМЕННЫЙ КОСТЫЛЬ: Пропускаем любой email/password
    try {
      // Имитируем задержку запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0], // Используем часть email как имя
        email: email,
        createdAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-token-' + Date.now()
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      
      toast.success(`Добро пожаловать, ${mockUser.name}!`)
      return { success: true }
    } catch (error: any) {
      const message = 'Ошибка авторизации'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await authService.register(userData)
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      
      toast.success('Регистрация успешна!')
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}