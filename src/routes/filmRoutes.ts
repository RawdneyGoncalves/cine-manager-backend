import { Router } from 'express';
import { FilmController } from '../controllers/filmController';

const router = Router();

router.get('/films/:userId', FilmController.getFilms);

export default router;
