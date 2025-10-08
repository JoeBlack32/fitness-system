import api from '../api/api'
import { CreateWorkoutData, Workout, ApiResponse } from '../types'

export const workoutService = {
  // Получить все тренировки
  getAll: async (params?: any): Promise<ApiResponse<{ workouts: Workout[] }>> => {
    const response = await api.get('/workouts', { params })
    
    return {
      success: response.data.success,
      data: {
        workouts: response.data.data || []
      }
    }
  },

  // Получить одну тренировку
  getById: async (id: string): Promise<ApiResponse<{ workout: Workout }>> => {
    const response = await api.get(`/workouts/${id}`)
    
    return {
      success: response.data.success,
      data: {
        workout: response.data.data
      }
    }
  },

  // Создать тренировку
  create: async (data: CreateWorkoutData): Promise<ApiResponse<{ workout: Workout }>> => {
    // Преобразуем данные в формат API бэкенда
    const apiData = {
      name: `${data.muscleGroup} - ${data.dayOfWeek}`,
      type: 'strength',
      date: data.date,
      duration: 60, // По умолчанию
      exercises: data.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps || 10,
        weight: ex.weight || 0,
      })),
      notes: data.notes || '',
    }

    const response = await api.post('/workouts', apiData)
    
    // Преобразуем ответ API обратно в формат фронтенда
    const workout: Workout = {
      id: response.data.data.id,
      muscleGroup: data.muscleGroup,
      date: data.date,
      dayOfWeek: data.dayOfWeek,
      exercises: data.exercises,
      notes: data.notes,
      createdAt: response.data.data.createdAt,
    }

    return {
      success: response.data.success,
      data: { workout }
    }
  },

  // Обновить тренировку
  update: async (id: string, data: Partial<Workout>): Promise<ApiResponse<{ workout: Workout }>> => {
    const response = await api.put(`/workouts/${id}`, data)
    
    return {
      success: response.data.success,
      data: {
        workout: response.data.data
      }
    }
  },

  // Удалить тренировку
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/workouts/${id}`)
    return response.data
  },

  // Получить последние тренировки
  getRecent: async (limit: number = 10): Promise<ApiResponse<{ workouts: Workout[] }>> => {
    const response = await api.get('/workouts', { 
      params: { limit } 
    })
    
    return {
      success: response.data.success,
      data: {
        workouts: response.data.data || []
      }
    }
  },

  // Получить статистику
  getStats: async (params?: any): Promise<ApiResponse<any>> => {
    const response = await api.get('/workouts/stats', { params })
    return response.data
  },
}