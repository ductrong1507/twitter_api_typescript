import express from 'express';
import { getListUserController, loginController, registerController } from '~/controllers/users.controllers';
import { registerValidator } from '~/middlewares/users.middlewares';
import { wrapHandler } from '~/utils/handlers';
const usersRouter = express.Router();

// Login
usersRouter.post('/login', loginController);

/**
 * DES: đăng ký 1 user mới
 * Path: /register
 * Method: POST
 * Body: name, email, password, date_of_birth: ISO8601
 */
usersRouter.post('/register', registerValidator, wrapHandler(registerController));

usersRouter.get('/', getListUserController);

export default usersRouter;
