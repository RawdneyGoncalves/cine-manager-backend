import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { WatchedFilm } from '../models/WatchedFilm';
import { Film } from '../models/film'
import { User } from '../models/userModel';

export class WatchedFilmController {
    static async markFilmAsWatched(req: Request, res: Response) {
        const { userId, filmId } = req.body;

        const filmRepo = getRepository(Film);
        const userRepo = getRepository(User);
        const watchedFilmRepo = getRepository(WatchedFilm);

        const user = await userRepo.findOne({ where: { id: Number(userId) } });
        const film = await filmRepo.findOne({ where: { id: Number(filmId) } });

        if (!user || !film) {
            return res.status(404).json({ message: 'User or Film not found' });
        }

        const watchedFilm = watchedFilmRepo.create({
            user,
            film,
            watchedAt: new Date()
        });

        await watchedFilmRepo.save(watchedFilm);

        res.status(201).json({ message: 'Film marked as watched', watchedFilm });
    }

    static async unmarkFilmAsWatched(req: Request, res: Response) {
        const { userId, filmId } = req.body;

        const watchedFilmRepo = getRepository(WatchedFilm);

        const watchedFilm = await watchedFilmRepo.findOne({ where: { user: { id: Number(userId) }, film: { id: Number(filmId) } } });

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

        const userIdNumber = Number(userId);

        const watchedFilms = await watchedFilmRepo.find({ where: { user: { id: userIdNumber } }, relations: ['film', 'film.theme'] });

        if (watchedFilms.length === 0) {
            return res.status(404).json({ message: 'No watched films found for this user' });
        }

        const totalFilmsWatched = watchedFilms.length;

        const themeWatchCounts: { [key: number]: number } = watchedFilms.reduce((acc: { [key: number]: number }, curr) => {
            const themeId = curr.film.theme.id;
            acc[themeId] = (acc[themeId] || 0) + 1;
            return acc;
        }, {} as { [key: number]: number });

        const mostWatchedThemeId = Object.keys(themeWatchCounts)
            .map(key => Number(key))
            .reduce((a, b) => themeWatchCounts[a] > themeWatchCounts[b] ? a : b);

        const mostWatchedThemeIdNumber = mostWatchedThemeId;

        const mostWatchedTheme = await filmRepo.findOne({
            where: { theme: { id: mostWatchedThemeIdNumber } },
            relations: ['theme']
        });

        const lastFilmWatched = watchedFilms.reduce((a, b) => (a.watchedAt > b.watchedAt ? a : b));

        res.status(200).json({
            userId: userIdNumber,
            totalFilmsWatched,
            mostWatchedTheme: {
                themeId: mostWatchedThemeIdNumber,
                themeName: mostWatchedTheme?.theme?.name || 'Unknown',
                totalFilmsWatched: themeWatchCounts[mostWatchedThemeIdNumber],
            },
            lastFilmWatched: {
                movieId: lastFilmWatched.film.id,
                movieName: lastFilmWatched.film.title,
            },
        });
    }
}
