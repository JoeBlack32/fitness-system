import { Request } from 'express';

// Enums
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum Goal {
  WEIGHT_LOSS = 'weight_loss',
  MUSCLE_GAIN = 'muscle_gain',
  MAINTENANCE = 'maintenance',
  ENDURANCE = 'endurance',
  GENERAL_FITNESS = 'general_fitness',
  FLEXIBILITY = 'flexibility'
}

export enum WorkoutType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  SPORTS = 'sports',
  OTHER = 'other'
}

export enum ProgramLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack'
}

// User Interfaces
export interface IUserSettings {
  notifications: boolean;
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
}

export interface IUserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  age?: number;
  gender?: Gender;
  weight?: number;
  height?: number;
  goal?: Goal;
  settings?: IUserSettings;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSafeAttributes extends Omit<IUserAttributes, 'password'> {}

// Workout Interfaces
export interface IExercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  rest?: number;
  notes?: string;
}

export interface IWorkoutAttributes {
  id: string;
  userId: string;
  date: string;
  type: WorkoutType;
  name: string;
  duration: number;
  exercises: IExercise[];
  caloriesBurned?: number;
  notes?: string;
  rating?: number;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Program Interfaces
export interface IProgramProgress {
  completedWorkouts: number;
  totalWorkouts: number;
  currentWeek: number;
}

export interface IWorkoutDay {
  name: string;
  type: WorkoutType;
  exercises: IExercise[];
  duration: number;
}

export interface IProgramSchedule {
  monday?: IWorkoutDay[];
  tuesday?: IWorkoutDay[];
  wednesday?: IWorkoutDay[];
  thursday?: IWorkoutDay[];
  friday?: IWorkoutDay[];
  saturday?: IWorkoutDay[];
  sunday?: IWorkoutDay[];
}

export interface IProgramAttributes {
  id: string;
  userId: string;
  name: string;
  description?: string;
  goal: Goal;
  level: ProgramLevel;
  duration: number;
  schedule: IProgramSchedule;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  progress: IProgramProgress;
  createdAt?: Date;
  updatedAt?: Date;
}

// Nutrition Interfaces
export interface IMeal {
  type: MealType;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time?: string;
  notes?: string;
}

export interface INutritionLogAttributes {
  id: string;
  userId: string;
  date: string;
  meals: IMeal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  waterIntake: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// JWT Payload
export interface IJwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// Request with User
export interface IAuthRequest extends Request {
  user?: IUserSafeAttributes;
}

// API Response
export interface IApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  error?: string;
}