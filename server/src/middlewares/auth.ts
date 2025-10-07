import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { IAuthRequest, IJwtPayload } from '../types';

export const protect = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Получаем токен из заголовка
      token = req.headers.authorization.split(' ')[1];

      // Верифицируем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;

      // Получаем пользователя из БД (без пароля)
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = user.toJSON();
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};