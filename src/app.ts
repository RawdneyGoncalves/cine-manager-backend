import express from 'express';
import MySQLDataSource from '../ormconfig';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../swagger-definitions';
import userRoutes from './routes/userRoutes';
import filmRoutes from './routes/filmRoutes';
import watchedFilmeRoutes from './routes/watchedFilmRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/watched-films', watchedFilmeRoutes);
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
