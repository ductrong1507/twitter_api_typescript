import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import HTTP_STATUS from '~/constants/httpStatus';
import { EntityError, ErrorWithStatus } from '~/models/Errors';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // thực hiện validate
    await validations.run(req);

    // lấy kết quả validate
    const errors = validationResult(req);

    // nếu không có lỗi thì next
    if (errors.isEmpty()) {
      return next();
    }

    // kiểm tra và phân loại lỗi 422 vs những lỗi khác
    const errorObj = errors.mapped();
    const entityError = new EntityError({ errors: {} });

    /**
     * Duyệt mảng lỗi và phân loại lỗi
     * Nếu lỗi do validate thì lưu vào entityError : có message, status, errors
     * Nếu lỗi do hệ thống thì trả về luôn: chỉ có message và status
     */
    for (const key in errorObj) {
      const { msg } = errorObj[key];
      console.log('errorObj[key]', errorObj[key]);

      // trả về lỗi nếu không phải lỗi do validate, trả về defaultErrorHandler
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg);
      }

      entityError.errors[key] = errorObj[key];
    }

    // trả về lỗi do validate
    next(entityError);
  };
};
