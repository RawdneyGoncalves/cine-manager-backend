import { Router } from 'express';
import { WatchedFilmController } from '../controllers/watchedFilmController';

const router = Router();

router.post('/mark', WatchedFilmController.markFilmAsWatched);
router.delete('/unmark', WatchedFilmController.unmarkFilmAsWatched);
router.get('/report/:userId', WatchedFilmController.generateWatchedFilmsReport);

export default router;
