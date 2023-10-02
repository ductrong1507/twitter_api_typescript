import express from 'express';
import { getListUserController } from '~/controllers/users.controllers';
const usersRouter = express.Router();

usersRouter.get('/users', getListUserController);

export default usersRouter;
