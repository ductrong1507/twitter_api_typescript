import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectId } from 'mongodb';
import { USERS_MESSAGES } from '~/constants/messages';
import { RegisterReqBody } from '~/models/requests/User.requests';
import Users from '~/models/schemas/User.schema';
import usersService from '~/services/users.services';

export const getListUserController = async (req: Request, res: Response) => {
  res.send('Users router is running!');
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
    message: USERS_MESSAGES.REGISTER_SUCCESSFULLY,
    result: result
  });
};

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as Users;
  const user_id = user._id as ObjectId;

  const { accessToken, refreshToken } = await usersService.login(user_id.toString());

  return res.status(200).send({
    message: USERS_MESSAGES.LOGIN_SUCCESSFULLY,
    result: {
      accessToken,
      refreshToken
    }
  });
};
