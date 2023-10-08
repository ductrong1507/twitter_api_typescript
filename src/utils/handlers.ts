import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Tạo một hàm wrapHandler để bắt lỗi trong các hàm xử lý của controller
 * Chỉ cần 1 khối try catch duy nhất ở đây,
 * để xử lý lỗi cho tất cả các hàm xử lý của controller
 * Sử dụng để bọc các hàm xử lý của controller ở ROUTER
 *
 */
export const wrapHandler = (func: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // throw new Error('test normal error');
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
