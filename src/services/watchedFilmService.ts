import { WatchedFilm } from '../models/WatchedFilm';
import MySQLDataSource from '../../ormconfig';
import mongoClient from '../config/mongoConfig';

const WatchedFilmRepository = MySQLDataSource.getRepository(WatchedFilm);

export class WatchedFilmService {
  static async markFilmAsWatched(userId: number, filmId: number) {
    const watchedFilm = WatchedFilmRepository.create({ userId, filmId, watchedAt: new Date() });
    return WatchedFilmRepository.save(watchedFilm);
  }

  static async unmarkFilmAsWatched(userId: number, filmId: number) {
    await WatchedFilmRepository.delete({ userId, filmId });
  }

  static async generateReport(userId: number) {
    const watchedFilms = await WatchedFilmRepository.find({ where: { userId } });
    
    const totalFilmsWatched = watchedFilms.length;
    
    // Use MongoDB to find the most watched theme and last film watched
    const mongoDb = mongoClient.db();
    const themeCollection = mongoDb.collection('films'); // Adjust collection name accordingly
    
    const mostWatchedTheme = await themeCollection.aggregate([
      { $match: { userId } },
      { $group: { _id: "$theme", totalFilmsWatched: { $sum: 1 } } },
      { $sort: { totalFilmsWatched: -1 } },
      { $limit: 1 }
    ]).toArray();
    
    const lastFilmWatched = watchedFilms[watchedFilms.length - 1];
    
    return {
      userId,
      totalFilmsWatched,
      mostWatchedTheme: {
        themeId: mostWatchedTheme[0]?._id,
        themeName: mostWatchedTheme[0]?.theme,
        totalFilmsWatched: mostWatchedTheme[0]?.totalFilmsWatched
      },
      lastFilmWatched: {
        movieId: lastFilmWatched?.filmId,
        movieName: lastFilmWatched?.name
      }
    };
  }
}
