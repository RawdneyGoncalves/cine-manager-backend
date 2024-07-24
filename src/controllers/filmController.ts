import { Request, Response } from 'express';
import { FilmService } from '../services/filmService';

export class FilmController {
    static async getFilms(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const themeIds = req.query.themeIds ? req.query.themeIds.toString().split(',').map(Number) : [];
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        try {
            const films = await FilmService.getFilmsForUser(userId, themeIds, { page, pageSize });
            res.json(films);
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred while retrieving films. Please try again later.' });
        }
    }

    static async getFilmsByTheme(req: Request, res: Response) {
        const themeId = parseInt(req.params.themeId);
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        try {
            const films = await FilmService.getFilmsByTheme(themeId, { page, pageSize });
            res.json(films);
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred while retrieving films. Please try again later.' });
        }
    }

    static async getAllFilms(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        try {
            const films = await FilmService.getAllFilms({ page, pageSize });
            res.json(films);
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred while retrieving films. Please try again later.' });
        }
    }
}
