import MySQLDataSource from '../../ormconfig';
import { Film } from '../models/film';
import { User } from '../models/userModel';
import { Package } from '../models/package';

interface PaginationOptions {
    page: number;
    pageSize: number;
}

export class FilmService {
    static async getFilmsForUser(userId: number, themeIds: number[], pagination: PaginationOptions) {
        const filmRepository = MySQLDataSource.getRepository(Film);
        const userRepository = MySQLDataSource.getRepository(User);
        const packageRepository = MySQLDataSource.getRepository(Package);

        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const userPackages = await packageRepository.createQueryBuilder('package')
            .leftJoinAndSelect('package.themes', 'theme')
            .where('package.userId = :userId', { userId })
            .getMany();

        const allowedThemeIds: number[] = userPackages.flatMap((pkg: Package) => pkg.themes.map((theme: { id: number }) => theme.id));

        const films = await filmRepository.createQueryBuilder('film')
            .where('film.themeId IN (:...themeIds)', { themeIds: themeIds.filter(id => allowedThemeIds.includes(id)) })
            .skip((pagination.page - 1) * pagination.pageSize)
            .take(pagination.pageSize)
            .getMany();

        return films;
    }

    static async getFilmsByTheme(themeId: number, pagination: PaginationOptions) {
        const filmRepository = MySQLDataSource.getRepository(Film);

        const films = await filmRepository.createQueryBuilder('film')
            .where('film.themeId = :themeId', { themeId })
            .skip((pagination.page - 1) * pagination.pageSize)
            .take(pagination.pageSize)
            .getMany();

        return films;
    }

    static async getAllFilms(pagination: PaginationOptions) {
        const filmRepository = MySQLDataSource.getRepository(Film);

        const films = await filmRepository.createQueryBuilder('film')
            .skip((pagination.page - 1) * pagination.pageSize)
            .take(pagination.pageSize)
            .getMany();

        return films;
    }
}