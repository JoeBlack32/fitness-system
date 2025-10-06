import api from '../api/api'
import { Workout, CreateWorkoutData } from '../types'
import { AxiosResponse } from 'axios'

export const workoutService = {
  // Получить все тренировки пользователя
  getAll: (params?: { 
    muscleGroup?: string, 
    startDate?: string, 
    endDate?: string,
    limit?: number 
  }): Promise<AxiosResponse<{ workouts: Workout[], total: number }>> => {
    return api.get('/workouts', { params })
  },

  // Получить тренировку по ID
  getById: (id: string): Promise<AxiosResponse<{ workout: Workout }>> => {
    return api.get(`/workouts/${id}`)
  },

  // Создать новую тренировку
  create: (data: CreateWorkoutData): Promise<AxiosResponse<{ workout: Workout }>> => {
    return api.post('/workouts', data)
  },

  // Обновить тренировку
  update: (id: string, data: Partial<Workout>): Promise<AxiosResponse<{ workout: Workout }>> => {
    return api.put(`/workouts/${id}`, data)
  },

  // Удалить тренировку
  delete: (id: string): Promise<AxiosResponse<{ message: string }>> => {
    return api.delete(`/workouts/${id}`)
  },

  // Получить статистику тренировок
  getStats: (period: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<AxiosResponse<{
    totalWorkouts: number
    totalExercises: number
    mostFrequentGroup: string
    workoutsByGroup: Record<string, number>
    workoutsByWeek: { week: string, count: number }[]
    averageSetsPerWorkout: number
  }>> => {
    return api.get(`/workouts/stats?period=${period}`)
  },

  // Получить тренировки по группе мышц
  getByMuscleGroup: (muscleGroup: string): Promise<AxiosResponse<{ workouts: Workout[] }>> => {
    return api.get(`/workouts/muscle-group/${muscleGroup}`)
  },

  // Получить последние N тренировок
  getRecent: (limit: number = 10): Promise<AxiosResponse<{ workouts: Workout[] }>> => {
    return api.get(`/workouts/recent?limit=${limit}`)
  }
}