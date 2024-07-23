import express from 'express';
import MySQLDataSource from './config/ormconfig';
import userRoutes from './routes/userRoutes';
import filmRoutes from './routes/filmRoutes';
import watchedFilmRoutes from './routes/watchedFilmRoutes'; 
import { connectToMongoDB } from './config/mongoConfig'; 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/watched-films', watchedFilmRoutes); 

MySQLDataSource.initialize()
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });


connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
