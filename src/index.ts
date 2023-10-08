import express from 'express';
// import { MongoClient, ServerApiVersion }  from('mongodb');
import 'dotenv/config';
import databaseService from '~/services/database.services';
import rootRouter from '~/routers/index.routers';
import { defaultErrorHandler } from '~/middlewares/error.middlewares';
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

// default error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
  // connect database
  databaseService.connect();
});
