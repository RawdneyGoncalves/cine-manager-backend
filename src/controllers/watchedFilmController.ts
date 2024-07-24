import { Request, Response } from 'express';
import { WatchedFilmService } from '../services/watchedFilmService';

export class WatchedFilmController {
    static async markFilmAsWatched(req: Request, res: Response) {
        try {
            const { userId, filmId } = req.body;

            const watchedFilm = await WatchedFilmService.markFilmAsWatched(userId, filmId);

            return res.status(201).json({ message: 'Film marked as watched', watchedFilm });
        } catch (error) {
            if (error === 'User not found' || error === 'Film not found') {
                return res.status(404).json({ message: error });
            } else if (error === 'Film already marked as watched') {
                return res.status(400).json({ message: error });
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    static async unmarkFilmAsWatched(req: Request, res: Response) {
        try {
            const { userId, filmId } = req.body;

            await WatchedFilmService.unmarkFilmAsWatched(userId, filmId);

            return res.status(200).json({ message: 'Film unmarked as watched' });
        } catch (error) {
            if (error === 'Watched Film entry not found') {
                return res.status(404).json({ message: error });
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    static async generateWatchedFilmsReport(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const report = await WatchedFilmService.generateReport(Number(userId));

            return res.status(200).json(report);
        } catch (error) {
            if (error === 'No watched films found for this user') {
                return res.status(404).json({ message: error });
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}
