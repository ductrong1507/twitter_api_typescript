import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/users.routes';

const app = express();

// test api
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Config router
app.use('/api/v1', usersRouter);

app.listen(5000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
