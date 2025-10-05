// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  goals?: string[]
  createdAt: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Workout types
export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  notes?: string
}

export interface Workout {
  id: string
  userId: string
  title: string
  date: string
  duration: number
  exercises: Exercise[]
  notes?: string
  intensity?: 'low' | 'medium' | 'high'
  createdAt: string
}

export interface WorkoutStats {
  totalWorkouts: number
  totalDuration: number
  averageIntensity: number
  mostFrequentExercises: string[]
  weeklyProgress: {
    week: string
    count: number
  }[]
}

// Program types
export interface ProgramDay {
  day: number
  title: string
  exercises: Exercise[]
}

export interface Program {
  id: string
  userId: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  days: ProgramDay[]
  isActive: boolean
  createdAt: string
}

// Nutrition types
export interface NutritionEntry {
  id: string
  userId: string
  date: string
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  food: string
  calories: number
  protein: number
  carbs: number
  fats: number
  notes?: string
}

export interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fats: number
}

export interface NutritionStats {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFats: number
  dailyAverage: NutritionGoals
  weeklyData: {
    date: string
    calories: number
  }[]
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}