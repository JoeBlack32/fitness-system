import api from '../api/api'
import { RegisterData, LoginCredentials, AuthResponse, ApiResponse } from '../types'

export const authService = {
  // Регистрация
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    })
    
    return {
      success: response.data.success,
      data: {
        token: response.data.token,
        user: response.data.data
      }
    }
  },

  // Вход
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', credentials)
    
    return {
      success: response.data.success,
      data: {
        token: response.data.token,
        user: response.data.data
      }
    }
  },

  // Получить текущего пользователя
  getMe: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Обновить профиль
  updateProfile: async (userData: Partial<any>): Promise<ApiResponse<any>> => {
    const response = await api.put('/auth/me', userData)
    return response.data
  },
}