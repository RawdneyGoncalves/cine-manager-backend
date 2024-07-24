import express from 'express';
import MySQLDataSource from '../ormconfig';
import userRoutes from './routes/userRoutes';
import filmRoutes from './routes/filmRoutes';
import watchedFilmeRoutes from './routes/watchedFilmRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/watched-films', watchedFilmeRoutes);

MySQLDataSource.initialize()
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
