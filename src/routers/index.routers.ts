import express from 'express';
import usersRouter from './users.routers';
const rootRouter = express.Router();

// Router cho users
rootRouter.use('/users', usersRouter);

export default rootRouter;
