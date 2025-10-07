import { Request, Response } from 'express';
import { User } from '../models';
import { IAuthRequest, IApiResponse } from '../types';
import * as jwt from "jsonwebtoken";

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const expiresIn = (process.env.JWT_EXPIRES_IN as unknown as jwt.SignOptions['expiresIn']) ?? "1d";

  const options: jwt.SignOptions = {
    expiresIn
  };

  // Приводим secret к jwt.Secret, чтобы перегрузки точно совпали
  return jwt.sign({ id }, secret as jwt.Secret, options);
};


// @desc    Регистрация нового пользователя
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, age, gender, weight, height, goal } = req.body;

    // Проверка обязательных полей
    if (!email || !password || !name) {
      res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      } as IApiResponse);
      return;
    }

    // Проверка существует ли пользователь
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      } as IApiResponse);
      return;
    }

    // Создание пользователя
    const user = await User.create({
      email,
      password,
      name,
      age,
      gender,
      weight,
      height,
      goal
    });

    // Генерация токена
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      data: user.toSafeObject()
    } as IApiResponse);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration' 
    } as IApiResponse);
  }
};

// @desc    Вход пользователя
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Проверка обязательных полей
    if (!email || !password) {
      res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      } as IApiResponse);
      return;
    }

    // Поиск пользователя
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      } as IApiResponse);
      return;
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      } as IApiResponse);
      return;
    }

    // Обновление последнего входа
    await user.update({ lastLogin: new Date() });

    // Генерация токена
    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      data: user.toSafeObject()
    } as IApiResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    } as IApiResponse);
  }
};

// @desc    Получение текущего пользователя
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user?.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      res.status(404).json({ 
        success: false,
        message: 'User not found' 
      } as IApiResponse);
      return;
    }

    res.json({
      success: true,
      data: user.toJSON()
    } as IApiResponse);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    } as IApiResponse);
  }
};