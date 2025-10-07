import { Response } from 'express';
import { Program } from '../models';
import { IAuthRequest, IApiResponse } from '../types';

// @desc    Получить все программы пользователя
// @route   GET /api/programs
// @access  Private
export const getPrograms = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const programs = await Program.findAll({
      where: { userId: req.user?.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: programs,
      count: programs.length
    } as IApiResponse);
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить активную программу
// @route   GET /api/programs/active
// @access  Private
export const getActiveProgram = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const program = await Program.findOne({
      where: {
        userId: req.user?.id,
        isActive: true
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        message: 'No active program found'
      } as IApiResponse);
      return;
    }

    res.json({
      success: true,
      data: program
    } as IApiResponse);
  } catch (error) {
    console.error('Get active program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Получить одну программу
// @route   GET /api/programs/:id
// @access  Private
export const getProgramById = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const program = await Program.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        message: 'Program not found'
      } as IApiResponse);
      return;
    }

    res.json({
      success: true,
      data: program
    } as IApiResponse);
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Создать новую программу
// @route   POST /api/programs
// @access  Private
export const createProgram = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, goal, level, duration, schedule } = req.body;

    // Валидация
    if (!name || !goal || !schedule) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, goal and schedule'
      } as IApiResponse);
      return;
    }

    const program = await Program.create({
      userId: req.user?.id as string,
      name,
      description,
      goal,
      level,
      duration: duration || 4,
      schedule,
      isActive: false,
      progress: {
        completedWorkouts: 0,
        totalWorkouts: 0,
        currentWeek: 1
      }
    });

    res.status(201).json({
      success: true,
      data: program
    } as IApiResponse);
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Обновить программу
// @route   PUT /api/programs/:id
// @access  Private
export const updateProgram = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const program = await Program.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        message: 'Program not found'
      } as IApiResponse);
      return;
    }

    const updated = await program.update(req.body);

    res.json({
      success: true,
      data: updated
    } as IApiResponse);
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Активировать программу
// @route   PUT /api/programs/:id/activate
// @access  Private
export const activateProgram = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    // Деактивировать все программы пользователя
    await Program.update(
      { isActive: false },
      { where: { userId: req.user?.id } }
    );

    // Активировать выбранную программу
    const program = await Program.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        message: 'Program not found'
      } as IApiResponse);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (program.duration * 7));

    const updated = await program.update({
      isActive: true,
      startDate: today,
      endDate: endDate.toISOString().split('T')[0]
    });

    res.json({
      success: true,
      data: updated
    } as IApiResponse);
  } catch (error) {
    console.error('Activate program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};

// @desc    Удалить программу
// @route   DELETE /api/programs/:id
// @access  Private
export const deleteProgram = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const program = await Program.findOne({
      where: {
        id: req.params.id,
        userId: req.user?.id
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        message: 'Program not found'
      } as IApiResponse);
      return;
    }

    await program.destroy();

    res.json({
      success: true,
      message: 'Program deleted successfully'
    } as IApiResponse);
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    } as IApiResponse);
  }
};