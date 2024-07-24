import { Router } from 'express';
import { FilmController } from '../controllers/filmController';

const router = Router();

router.get('/:id', FilmController.getFilms);
router.get('/theme/:themeId', FilmController.getFilmsByTheme);
router.get('/', FilmController.getAllFilms);

export default router;


/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Obtém um filme pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme obtido com sucesso
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /films/theme/{themeId}:
 *   get:
 *     summary: Obtém filmes por ID de tema
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         description: ID do tema
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filmes obtidos com sucesso
 *       404:
 *         description: Tema não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Obtém todos os filmes
 *     responses:
 *       200:
 *         description: Lista de filmes obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
