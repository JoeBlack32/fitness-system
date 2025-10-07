import { Response } from 'express';
import { Op } from 'sequelize';
import { NutritionLog } from '../models';
import { IAuthRequest, IApiResponse, IMeal } from '../types';

// @desc    Получить все записи питания
// @route   GET /api/nutrition
// @access  Private
export const getNutritionLogs = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user?.id;

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const logs = await NutritionLog.findAll({
      where,
      order: [['date', 'DESC']]
    });

    res.json({
      success: true,
      data: logs,
      count: logs.length
    } as IApiResponse);
  } catch (error) {
    console.error('Get nutrition logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить запись питания по дате
// @route   GET /api/nutrition/:date
// @access  Private
export const getNutritionByDate = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const log = await NutritionLog.findOne({
      where: {
        userId: req.user?.id,
        date: req.params.date
      }
    });

    if (!log) {
      res.status(404).json({
        success: false,
        message: 'Nutrition log not found for this date'
      } as IApiResponse);
      return;
    }

    res.json({
      success: true,
      data: log
    } as IApiResponse);
  } catch (error) {
    console.error('Get nutrition by date error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// Вспомогательная функция для подсчета итогов
const calculateTotals = (meals: IMeal[]) => {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fats: totals.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

// @desc    Создать/Обновить запись питания
// @route   POST /api/nutrition
// @access  Private
export const createOrUpdateNutritionLog = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { date, meals, waterIntake, notes } = req.body;

    if (!date || !meals) {
      res.status(400).json({
        success: false,
        message: 'Please provide date and meals'
      } as IApiResponse);
      return;
    }

    // Подсчитываем итоги
    const totals = calculateTotals(meals);

    // Ищем существующую запись
    let log = await NutritionLog.findOne({
      where: {
        userId: req.user?.id,
        date
      }
    });

    if (log) {
      // Обновляем существующую запись
      log = await log.update({
        meals,
        totalCalories: totals.calories,
        totalProtein: totals.protein,
        totalCarbs: totals.carbs,
        totalFats: totals.fats,
        waterIntake: waterIntake || 0,
        notes
      });
    } else {
      // Создаем новую запись
      log = await NutritionLog.create({
        userId: req.user?.id as string,
        date,
        meals,
        totalCalories: totals.calories,
        totalProtein: totals.protein,
        totalCarbs: totals.carbs,
        totalFats: totals.fats,
        waterIntake: waterIntake || 0,
        notes
      });
    }

    res.status(log ? 200 : 201).json({
      success: true,
      data: log
    } as IApiResponse);
  } catch (error) {
    console.error('Create/Update nutrition log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Добавить прием пищи к существующей записи
// @route   PUT /api/nutrition/:date/meals
// @access  Private
export const addMealToLog = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { date } = req.params;
    const meal: IMeal = req.body;

    if (!meal.name || !meal.type) {
      res.status(400).json({
        success: false,
        message: 'Please provide meal name and type'
      } as IApiResponse);
      return;
    }

    let log = await NutritionLog.findOne({
      where: {
        userId: req.user?.id,
        date
      }
    });

    if (!log) {
      // Создаем новую запись если не существует
      log = await NutritionLog.create({
        userId: req.user?.id as string,
        date,
        meals: [meal],
        totalCalories: meal.calories,
        totalProtein: meal.protein,
        totalCarbs: meal.carbs,
        totalFats: meal.fats,
        waterIntake: 0
      });
    } else {
      // Добавляем прием пищи к существующей записи
      const updatedMeals = [...log.meals, meal];
      const totals = calculateTotals(updatedMeals);

      log = await log.update({
        meals: updatedMeals,
        totalCalories: totals.calories,
        totalProtein: totals.protein,
        totalCarbs: totals.carbs,
        totalFats: totals.fats
      });
    }

    res.json({
      success: true,
      data: log
    } as IApiResponse);
  } catch (error) {
    console.error('Add meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Удалить запись питания
// @route   DELETE /api/nutrition/:date
// @access  Private
export const deleteNutritionLog = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const log = await NutritionLog.findOne({
      where: {
        userId: req.user?.id,
        date: req.params.date
      }
    });

    if (!log) {
      res.status(404).json({
        success: false,
        message: 'Nutrition log not found'
      } as IApiResponse);
      return;
    }

    await log.destroy();

    res.json({
      success: true,
      message: 'Nutrition log deleted successfully'
    } as IApiResponse);
  } catch (error) {
    console.error('Delete nutrition log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить статистику питания
// @route   GET /api/nutrition/stats
// @access  Private
export const getNutritionStats = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user?.id;

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const logs = await NutritionLog.findAll({ where });

    const stats = {
      totalDays: logs.length,
      averageCalories: logs.length > 0
        ? logs.reduce((sum, log) => sum + log.totalCalories, 0) / logs.length
        : 0,
      averageProtein: logs.length > 0
        ? logs.reduce((sum, log) => sum + log.totalProtein, 0) / logs.length
        : 0,
      averageCarbs: logs.length > 0
        ? logs.reduce((sum, log) => sum + log.totalCarbs, 0) / logs.length
        : 0,
      averageFats: logs.length > 0
        ? logs.reduce((sum, log) => sum + log.totalFats, 0) / logs.length
        : 0,
      totalWater: logs.reduce((sum, log) => sum + log.waterIntake, 0)
    };

    res.json({
      success: true,
      data: stats
    } as IApiResponse);
  } catch (error) {
    console.error('Get nutrition stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};