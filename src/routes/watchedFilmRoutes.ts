import { Router } from 'express';
import { WatchedFilmController } from '../controllers/watchedFilmController';

const router = Router();

router.post('/mark', WatchedFilmController.markFilmAsWatched);
router.delete('/unmark', WatchedFilmController.unmarkFilmAsWatched);
router.get('/report/:userId', WatchedFilmController.generateWatchedFilmsReport);

export default router;


/**
 * @swagger
 * /watched-films/mark:
 *   post:
 *     summary: Marca um filme como assistido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               filmId:
 *                 type: number
 *             required:
 *               - userId
 *               - filmId
 *     responses:
 *       200:
 *         description: Filme marcado como assistido com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário ou filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /watched-films/unmark:
 *   delete:
 *     summary: Desmarca um filme como assistido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               filmId:
 *                 type: number
 *             required:
 *               - userId
 *               - filmId
 *     responses:
 *       200:
 *         description: Filme desmarcado como assistido com sucesso
 *       404:
 *         description: Filme ou entrada de filme assistido não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /watched-films/report/{userId}:
 *   get:
 *     summary: Gera um relatório de filmes assistidos por usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relatório gerado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
