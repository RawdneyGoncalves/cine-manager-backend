import { getRepository } from "typeorm";
import { Film } from "../models/Film";
import { User } from "../models/User";
import { Package } from "../models/Package";

interface PaginationOptions {
    page: number;
    pageSize: number;
}

export class FilmService {
    static async getFilmsForUser(userId: number, themeIds: number[], pagination: PaginationOptions) {
        const filmRepository = getRepository(Film);
        const userRepository = getRepository(User);

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error("User not found");
        }

        const userPackages = await getRepository(Package)
            .createQueryBuilder('package')
            .leftJoinAndSelect('package.themes', 'theme')
            .where('package.userId = :userId', { userId })
            .getMany();

        const allowedThemeIds = userPackages.flatMap(p => p.themes.map(t => t.id));

        const films = await filmRepository.createQueryBuilder('film')
            .where('film.themeId IN (:...themeIds)', { themeIds: themeIds.filter(id => allowedThemeIds.includes(id)) })
            .skip((pagination.page - 1) * pagination.pageSize)
            .take(pagination.pageSize)
            .getMany();

        return films;
    }
}
