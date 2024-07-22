import express from 'express';
import MySQLDataSource from './config/ormconfig';
//import userRoutes from './src/routes/userRoutes';
//import movieRoutes from './src/routes/movieRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//app.use('/api/users', userRoutes);
//app.use('/api/movies', movieRoutes);

MySQLDataSource.initialize()
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;