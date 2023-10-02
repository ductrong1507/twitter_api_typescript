import { Request, Response, NextFunction } from 'express';
import Users from '~/models/schemas/User.schema';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';

export const getListUserController = async (req: Request, res: Response) => {
  // const userInsert = await databaseService.users.insertOne(
  //   new Users({
  //     email: 'email.com.vn',
  //     password: 'sadasd'
  //   })
  // );

  const userInsert = await usersService.register({
    email: 'email.com.vn',
    password: 'sadasd'
  });

  console.log('userInsert', userInsert);

  res.send('Users router is running!');
};
