import express from 'express';
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats
} from '../controllers/workoutController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Все маршруты защищены
router.use(protect);

router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

router.get('/stats', getWorkoutStats);

router.route('/:id')
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

export default router;