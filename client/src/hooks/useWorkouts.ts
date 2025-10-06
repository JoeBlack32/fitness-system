import { useState, useEffect } from 'react'
import { workoutService } from '../services/workoutService'
import { Workout, CreateWorkoutData } from '../types'
import toast from 'react-hot-toast'

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузить все тренировки
  const fetchWorkouts = async (params?: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await workoutService.getAll(params)
      setWorkouts(response.data.workouts)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка загрузки тренировок'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  // Создать тренировку
  const createWorkout = async (data: CreateWorkoutData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await workoutService.create(data)
      setWorkouts([response.data.workout, ...workouts])
      toast.success('Тренировка сохранена!')
      return { success: true, workout: response.data.workout }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка сохранения тренировки'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Обновить тренировку
  const updateWorkout = async (id: string, data: Partial<Workout>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await workoutService.update(id, data)
      setWorkouts(workouts.map(w => w.id === id ? response.data.workout : w))
      toast.success('Тренировка обновлена!')
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка обновления'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Удалить тренировку
  const deleteWorkout = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await workoutService.delete(id)
      setWorkouts(workouts.filter(w => w.id !== id))
      toast.success('Тренировка удалена')
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

  // Загрузить последние тренировки
  const fetchRecentWorkouts = async (limit: number = 10) => {
    setLoading(true)
    setError(null)
    try {
      const response = await workoutService.getRecent(limit)
      setWorkouts(response.data.workouts)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка загрузки'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    fetchRecentWorkouts,
    setWorkouts
  }
}