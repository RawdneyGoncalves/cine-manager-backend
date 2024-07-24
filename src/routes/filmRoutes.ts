import { Router } from 'express';
import { FilmController } from '../controllers/filmController';

const router = Router();

router.get('/films/:id', FilmController.getFilmsForUser);
router.get('/films', FilmController.listAllFilms);

export default router;
