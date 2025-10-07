import express from 'express';
import {
  getPrograms,
  getActiveProgram,
  getProgramById,
  createProgram,
  updateProgram,
  activateProgram,
  deleteProgram
} from '../controllers/programController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Все маршруты защищены
router.use(protect);

router.route('/')
  .get(getPrograms)
  .post(createProgram);

router.get('/active', getActiveProgram);

router.route('/:id')
  .get(getProgramById)
  .put(updateProgram)
  .delete(deleteProgram);

router.put('/:id/activate', activateProgram);

export default router;