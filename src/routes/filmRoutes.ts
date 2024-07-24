import { Router } from 'express';
import { FilmController } from '../controllers/filmController';

const router = Router();

router.get('/:id', FilmController.getFilms);
router.get('/theme/:themeId', FilmController.getFilmsByTheme);
router.get('/', FilmController.getAllFilms);

export default router;
