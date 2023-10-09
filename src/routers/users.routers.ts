import express from 'express';
import { getListUserController, loginController, registerController } from '~/controllers/users.controllers';
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares';
import { wrapHandler } from '~/utils/handlers';
const usersRouter = express.Router();

/**
 * DES: đăng ký 1 user mới
 * Path: /register
 * Method: POST
 * Body: name, email, password, date_of_birth: ISO8601
 */
usersRouter.post('/register', registerValidator, wrapHandler(registerController));

/**
 * DES: đăng nhập
 * Path: /login
 * Method: POST
 * Body: email, password
 */
usersRouter.post('/login', loginValidator, wrapHandler(loginController));

usersRouter.get('/', getListUserController);

export default usersRouter;
