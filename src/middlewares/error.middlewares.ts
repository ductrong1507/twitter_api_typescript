import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import HTTP_STATUS from '~/constants/httpStatus';
import { ErrorWithStatus } from '~/models/Errors';

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('defaultErrorHandler', err);
  // chuẩn hóa lỗi
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).send(omit(err, ['status']));
  }

  // chuyển enumerable thành true
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true });
  });

  return res.status(HTTP_STATUS.INTERNAL_SERVER).send({
    message: err.message,
    errorInfo: omit(err, ['stack'])
  });
};
