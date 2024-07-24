import MySQLDataSource from '../../ormconfig';
import { WatchedFilm } from '../models/WatchedFilm';
import { Film } from '../models/film';
import { User } from '../models/userModel';

interface PaginationOptions {
  page: number;
  pageSize: number;
}

export class WatchedFilmService {
  static async markFilmAsWatched(userId: number, filmId: number) {
    const watchedFilmRepository = MySQLDataSource.getRepository(WatchedFilm);
    const filmRepository = MySQLDataSource.getRepository(Film);
    const userRepository = MySQLDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    const film = await filmRepository.findOneBy({ id: filmId });

    if (!user) {
      throw new Error('User not found');
    }
    if (!film) {
      throw new Error('Film not found');
    }

    const existingWatchedFilm = await watchedFilmRepository.findOne({
      where: {
        user: { id: userId },
        film: { id: filmId },
      },
    });

    if (existingWatchedFilm) {
      throw new Error('Film already marked as watched');
    }

    const watchedFilm = watchedFilmRepository.create({
      user,
      film,
      watchedAt: new Date(),
    });

    return watchedFilmRepository.save(watchedFilm);
  }

  static async unmarkFilmAsWatched(userId: number, filmId: number) {
    const watchedFilmRepository = MySQLDataSource.getRepository(WatchedFilm);

    const watchedFilm = await watchedFilmRepository.findOne({
      where: {
        user: { id: userId },
        film: { id: filmId },
      },
    });

    if (!watchedFilm) {
      throw new Error('Watched Film entry not found');
    }

    await watchedFilmRepository.remove(watchedFilm);
  }

  static async generateReport(userId: number) {
    const watchedFilmRepository = MySQLDataSource.getRepository(WatchedFilm);

    const watchedFilms = await watchedFilmRepository.find({
      where: { user: { id: userId } },
      relations: ['film', 'film.theme'],
    });

    if (watchedFilms.length === 0) {
      throw new Error('No watched films found for this user');
    }

    const totalFilmsWatched = watchedFilms.length;

    const themeWatchCounts: { [key: number]: number } = watchedFilms.reduce((acc, curr) => {
      const themeId = curr.film.theme.id;
      acc[themeId] = (acc[themeId] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    const mostWatchedThemeId = Object.keys(themeWatchCounts)
      .map(key => Number(key))
      .reduce((a, b) => (themeWatchCounts[a] > themeWatchCounts[b] ? a : b), -1);

    const mostWatchedTheme = watchedFilms.find(wf => wf.film.theme.id === mostWatchedThemeId)?.film.theme;

    const lastFilmWatched = watchedFilms.reduce((latest, current) => (latest.watchedAt > current.watchedAt ? latest : current), watchedFilms[0]);

    return {
      userId,
      totalFilmsWatched,
      mostWatchedTheme: {
        themeId: mostWatchedThemeId,
        themeName: mostWatchedTheme?.name || 'Unknown',
        totalFilmsWatched: themeWatchCounts[mostWatchedThemeId] || 0,
      },
      lastFilmWatched: {
        movieId: lastFilmWatched.film.id,
        movieName: lastFilmWatched.film.title,
      },
    };
  }
}
