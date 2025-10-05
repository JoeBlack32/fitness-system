import api from '../api/api'
import { LoginCredentials, RegisterData, AuthResponse } from '../types'
import { AxiosResponse } from 'axios'

export const authService = {
  login: (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/auth/login', { email, password })
  },

  register: (userData: RegisterData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/auth/register', userData)
  },

  logout: (): Promise<AxiosResponse<void>> => {
    return api.post('/auth/logout')
  },

  getProfile: (): Promise<AxiosResponse<any>> => {
    return api.get('/auth/profile')
  },

  updateProfile: (data: Partial<any>): Promise<AxiosResponse<any>> => {
    return api.put('/auth/profile', data)
  },
}