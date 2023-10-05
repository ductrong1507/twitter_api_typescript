// import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import usersService from '~/services/users.services';
import { validate } from '~/utils/validation';

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 1, max: 100 }
      },
      trim: true,
      errorMessage: 'The name must not empty'
    },

    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Must be a valid e-mail address'
      },
      trim: true,
      errorMessage: 'The email must not empty',
      custom: {
        options: async (value, { req }) => {
          // check email exists in database
          const isExistsEmail = await usersService.checkEmailExists(value);
          if (isExistsEmail) throw new Error('The email already exists');
          return true;
        },
        errorMessage: 'The email already exists'
      }
    },

    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: 'The password must be at least 6 characters'
      },
      errorMessage: 'The password must not empty'
    },

    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 50 }
      },

      custom: {
        options: (value, { req }) => {
          return value === req.body.password;
        },
        errorMessage: 'The password confirmation does not match.'
      }
    },

    date_of_birth: {
      notEmpty: true,
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: 'The date_of_birth must match ISO 8601 format'
      },
      errorMessage: 'The date_of_birth must not empty'
    }
  })
);
