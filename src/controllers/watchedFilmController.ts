import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { WatchedFilm } from '../models/WatchedFilm';
import { Film } from '../models/film';
import { User } from '../models/userModel';

export class WatchedFilmController {
    static async markFilmAsWatched(req: Request, res: Response) {
        const { userId, filmId } = req.body;

        const filmRepo = getRepository(Film);
        const userRepo = getRepository(User);
        const watchedFilmRepo = getRepository(WatchedFilm);

        const user = await userRepo.findOne(userId);
        const film = await filmRepo.findOne(filmId);

        if (!user || !film) {
            return res.status(404).json({ message: 'User or Film not found' });
        }

        const watchedFilm = new WatchedFilm();
        watchedFilm.user = user;
        watchedFilm.film = film;
        watchedFilm.watchedAt = new Date();

        await watchedFilmRepo.save(watchedFilm);

        res.status(201).json({ message: 'Film marked as watched', watchedFilm });
    }

    static async unmarkFilmAsWatched(req: Request, res: Response) {
        const { userId, filmId } = req.body;

        const watchedFilmRepo = getRepository(WatchedFilm);

        const watchedFilm = await watchedFilmRepo.findOne({ where: { user: userId, film: filmId } });

        if (!watchedFilm) {
            return res.status(404).json({ message: 'Watched Film not found' });
        }

        await watchedFilmRepo.remove(watchedFilm);

        res.status(200).json({ message: 'Film unmarked as watched' });
    }

    static async generateWatchedFilmsReport(req: Request, res: Response) {
        const { userId } = req.params;

        const watchedFilmRepo = getRepository(WatchedFilm);
        const filmRepo = getRepository(Film);

        const watchedFilms = await watchedFilmRepo.find({ where: { user: userId }, relations: ['film'] });

        if (watchedFilms.length === 0) {
            return res.status(404).json({ message: 'No watched films found for this user' });
        }

        const totalFilmsWatched = watchedFilms.length;
        const mostWatchedTheme = watchedFilms.reduce((acc, curr) => {
            acc[curr.film.theme] = (acc[curr.film.theme] || 0) + 1;
            return acc;
        }, {});

        const mostWatchedThemeId = Object.keys(mostWatchedTheme).reduce((a, b) => (mostWatchedTheme[a] > mostWatchedTheme[b] ? a : b));
        const mostWatchedThemeName = await filmRepo.findOne({ where: { theme: mostWatchedThemeId } });

        const lastFilmWatched = watchedFilms.reduce((a, b) => (a.watchedAt > b.watchedAt ? a : b));

        res.status(200).json({
            userId,
            totalFilmsWatched,
            mostWatchedTheme: {
                themeId: mostWatchedThemeId,
                themeName: mostWatchedThemeName?.theme,
                totalFilmsWatched: mostWatchedTheme[mostWatchedThemeId],
            },
            lastFilmWatched: {
                movieId: lastFilmWatched.film.id,
                movieName: lastFilmWatched.film.title,
            },
        });
    }
}
