import { Request, Response } from 'express';
import { FilmService } from '../services/filmService';

export class FilmController {
    static async listAllFilms(req: Request, res: Response) {
        try {
            const { page = 1, pageSize = 10 } = req.query;
            const films = await FilmService.getAllFilms({
                page: Number(page),
                pageSize: Number(pageSize)
            });
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve films', error });
        }
    }

    static async getFilmsForUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const themeIds = req.query.themeIds ? (req.query.themeIds as string).split(',').map(Number) : [];
            const { page = 1, pageSize = 10 } = req.query;
            const films = await FilmService.getFilmsForUser(userId, themeIds, {
                page: Number(page),
                pageSize: Number(pageSize)
            });
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve films', error });
        }
    }
}
