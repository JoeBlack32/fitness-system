import express from 'express';
import {
  getNutritionLogs,
  getNutritionByDate,
  createOrUpdateNutritionLog,
  addMealToLog,
  deleteNutritionLog,
  getNutritionStats,
  getNutritionProfile,      
  createOrUpdateProfile,    
  getWeightLogs   
} from '../controllers/nutritionController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Все маршруты защищены
router.use(protect);

router.route('/')
  .get(getNutritionLogs)
  .post(createOrUpdateNutritionLog);

router.get('/stats', getNutritionStats);

router.route('/profile')
  .get(getNutritionProfile)
  .post(createOrUpdateProfile);

router.get('/weight-logs', getWeightLogs);

router.route('/:date')
  .get(getNutritionByDate)
  .delete(deleteNutritionLog);

router.put('/:date/meals', addMealToLog);

export default router;