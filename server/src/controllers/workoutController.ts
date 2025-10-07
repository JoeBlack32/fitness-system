import { Response } from 'express';
import { Op } from 'sequelize';
import { Workout } from '../models';
import { IAuthRequest, IApiResponse } from '../types';

// @desc    Получить все тренировки пользователя
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, type } = req.query;
    const userId = req.user?.id;

    const where: any = { userId };

    // Фильтр по датам
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    // Фильтр по типу
    if (type) {
      where.type = type;
    }

    const workouts = await Workout.findAll({
      where,
      order: [['date', 'DESC']]
    });

    res.json({
      success: true,
      data: workouts,
      count: workouts.length
    } as IApiResponse);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить одну тренировку
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkoutById = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!workout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      } as IApiResponse);
      return;
    }

    res.json({
      success: true,
      data: workout
    } as IApiResponse);
  } catch (error) {
    console.error('Get workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Создать новую тренировку
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { date, type, name, duration, exercises, caloriesBurned, notes, rating } = req.body;

    // Валидация
    if (!name || !duration || !type) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, duration and type'
      } as IApiResponse);
      return;
    }

    const workout = await Workout.create({
      userId: req.user?.id as string,
      date,
      type,
      name,
      duration,
      exercises: exercises || [],
      caloriesBurned,
      notes,
      rating,
      completed: true
    });

    res.status(201).json({
      success: true,
      data: workout
    } as IApiResponse);
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Обновить тренировку
// @route   PUT /api/workouts/:id
// @access  Private
export const updateWorkout = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!workout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      } as IApiResponse);
      return;
    }

    const updated = await workout.update(req.body);

    res.json({
      success: true,
      data: updated
    } as IApiResponse);
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Удалить тренировку
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!workout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      } as IApiResponse);
      return;
    }

    await workout.destroy();

    res.json({
      success: true,
      message: 'Workout deleted successfully'
    } as IApiResponse);
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить статистику тренировок
// @route   GET /api/workouts/stats
// @access  Private
export const getWorkoutStats = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user?.id;

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const workouts = await Workout.findAll({ where });

    const stats = {
      totalWorkouts: workouts.length,
      totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
      totalCalories: workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
      byType: workouts.reduce((acc: any, w) => {
        acc[w.type] = (acc[w.type] || 0) + 1;
        return acc;
      }, {}),
      averageRating: workouts.filter(w => w.rating).length > 0
        ? workouts.reduce((sum, w) => sum + (w.rating || 0), 0) / workouts.filter(w => w.rating).length
        : 0
    };

    res.json({
      success: true,
      data: stats
    } as IApiResponse);
  } catch (error) {
    console.error('Get workout stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};