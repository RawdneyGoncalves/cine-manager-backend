import express from 'express';
import { AppDataSource } from './config/ormconfig.ts';
import connectMongoDB from './config/mongooseConfig.ts/index.ts';
import userRoutes from './routes/userRoutes.ts/index.ts';
import movieRoutes from './routes/movieRoutes.ts/index.ts';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });

connectMongoDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
