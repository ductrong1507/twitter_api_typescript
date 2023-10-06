import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RegisterReqBody } from '~/models/requests/User.requests';
import usersService from '~/services/users.services';

export const getListUserController = async (req: Request, res: Response) => {
  res.send('Users router is running!');
};

export const loginController = async (req: Request, res: Response) => {
  res.send('Login feature');
};

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, date_of_birth, password, confirm_password } = req.body;
  // throw new Error('test error');
  const result = await usersService.register({
    name,
    email,
    date_of_birth,
    password,
    confirm_password
  });

  return res.status(201).send({
    message: 'Register successfully',
    result: result
  });
};
