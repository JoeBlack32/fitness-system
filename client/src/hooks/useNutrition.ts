import { useState } from 'react'
import { nutritionService, NutritionProfile, WeightLog } from '../services/nutritionService'
import toast from 'react-hot-toast'

export const useNutrition = () => {
  const [profile, setProfile] = useState<NutritionProfile | null>(null)
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Получить профиль
  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await nutritionService.getProfile()
      setProfile(response.data.data)
    } catch (err: any) {
      if (err.response?.status !== 404) {
        const message = err.response?.data?.message || 'Ошибка загрузки профиля'
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Сохранить профиль
  const saveProfile = async (data: NutritionProfile) => {
    setLoading(true)
    setError(null)
    try {
      const response = await nutritionService.createOrUpdateProfile(data)
      setProfile(response.data.data)
      toast.success('Профиль сохранен!')
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка сохранения профиля'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Получить логи веса
  const fetchWeightLogs = async (params?: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await nutritionService.getWeightLogs(params)
      setWeightLogs(response.data.data)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка загрузки данных'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  // Добавить лог веса
  const addWeightLog = async (data: WeightLog) => {
    setLoading(true)
    setError(null)
    try {
      const response = await nutritionService.createWeightLog(data)
      setWeightLogs([response.data.data, ...weightLogs])
      toast.success('Запись добавлена!')
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка добавления записи'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Удалить лог
  const deleteWeightLog = async (date: string) => {
    setLoading(true)
    setError(null)
    try {
      await nutritionService.deleteWeightLog(date)
      setWeightLogs(weightLogs.filter(log => log.date !== date))
      toast.success('Запись удалена')
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка удаления'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    weightLogs,
    loading,
    error,
    fetchProfile,
    saveProfile,
    fetchWeightLogs,
    addWeightLog,
    deleteWeightLog,
    setProfile,
    setWeightLogs
  }
}