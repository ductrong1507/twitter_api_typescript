import { Request } from 'express';
import Users from '~/models/schemas/User.schema';

declare module 'express' {
  interface Request {
    user?: Users;
  }
}
