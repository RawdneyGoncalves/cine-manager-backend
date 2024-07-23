import { Request, Response } from 'express';
import { FilmService } from '../services/filmService';

export class FilmController {
    static async getFilms(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const themeIds = req.query.themeIds ? (req.query.themeIds as string).split(',').map(Number) : [];
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;

            const films = await FilmService.getFilmsForUser(userId, themeIds, { page, pageSize });
            res.json(films);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
