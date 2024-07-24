import express from 'express';
import MySQLDataSource from '../ormconfig';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../swagger-definitions';
import userRoutes from './routes/userRoutes';
import filmRoutes from './routes/filmRoutes';
import watchedFilmRoutes from './routes/watchedFilmRoutes';
import { PasswordResetService } from './services/passwordResetService'; // Importando o serviço de reset de senha

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/watched-films', watchedFilmRoutes);

app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: 'E-mail is required.' });
    }

    await PasswordResetService.initiatePasswordReset(email, 'your_secret_here');
    res.status(200).json({ message: 'Password reset e-mail sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDefinition));

MySQLDataSource.initialize()
  .then(() => {
    console.log('MySQL connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });

export default app;
