import express from 'express';
import { getListUserController } from '~/controllers/users.controllers';
const usersRouter = express.Router();

// Login
usersRouter.post('/login', (req, res) => {
  res.send('Login feature');
});

// Register
usersRouter.post('/register', (req, res) => {
  res.send('register feature');
});

usersRouter.get('/users', getListUserController);

export default usersRouter;
