import express from 'express';
// import { MongoClient, ServerApiVersion }  from('mongodb');
import 'dotenv/config';
import databaseService from '~/services/database.services';
import rootRouter from './routers/index.routers';
// import usersRouter from '~/routes/users.routes';

const app = express();

// config cơ bản
app.use(express.json()); // sử dụng định dạng json

// test api
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Config router
app.use('/api/v1', rootRouter);

app.listen(5000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
  databaseService
    .connect()
    .then((result) => {
      console.log('result', result);
    })
    .catch(console.dir);
});
