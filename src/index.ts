import express from 'express';
// import { MongoClient, ServerApiVersion }  from('mongodb');
import 'dotenv/config';
import usersRouter from '~/routes/users.routes';
import databaseService from '~/services/database.services';
// import usersRouter from '~/routes/users.routes';

const app = express();

// config cơ bản
app.use(express.json()); // sử dụng định dạng json

// test api
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Config router
app.use('/api/v1', usersRouter);

app.listen(5000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
  databaseService.connect();
});
