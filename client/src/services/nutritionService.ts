import api from '../api/api'

export interface NutritionProfile {
  height: number
  targetWeight: number
  goal: 'loss' | 'gain' | 'maintain'
  activityLevel: number
}

export interface WeightLog {
  id?: string
  date: string
  weight: number
  calories: number
  createdAt?: string
}

export const nutritionService = {
  // Профиль
  getProfile: () => api.get('/nutrition/profile'),
  createOrUpdateProfile: (data: NutritionProfile) => api.post('/nutrition/profile', data),

  // Логи веса
  getWeightLogs: (params?: any) => api.get('/nutrition/weight-logs', { params }),
  createWeightLog: (data: WeightLog) => api.post('/nutrition', {
  date: data.date,
  weight: data.weight,           // ← ВЕС
  totalCalories: data.calories,  // ← КАЛОРИИ  
  meals: [],                     // ← Пустой массив приемов пищи
  totalProtein: 0,               // ← Добавь эти поля
  totalCarbs: 0,
  totalFats: 0,
  waterIntake: 0
}),
  deleteWeightLog: (date: string) => api.delete(`/nutrition/${date}`),

  // Статистика
  getStats: (params?: any) => api.get('/nutrition/stats', { params })
}