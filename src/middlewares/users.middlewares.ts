// import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { USERS_MESSAGES } from '~/constants/messages';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';
import { hashPassword } from '~/utils/crypto';
import { validate } from '~/utils/validation';

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.REGISTER_NAME_REQUIRED
      },
      isString: {
        errorMessage: USERS_MESSAGES.REGISTER_NAME_STRING
      },
      isLength: {
        options: { min: 3, max: 100 },
        errorMessage: USERS_MESSAGES.REGISTER_NAME_LENGTH
      },
      trim: true
    },

    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.REGISTER_EMAIL_REQUIRED
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.REGISTER_EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          // check email exists in database
          const isExistsEmail = await usersService.checkEmailExists(value);
          if (isExistsEmail) {
            throw new Error(USERS_MESSAGES.REGISTER_EMAIL_EXISTS);
          }
          return true;
        }
      }
    },

    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.REGISTER_PASSWORD_REQUIRED
      },

      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: USERS_MESSAGES.REGISTER_PASSWORD_LENGTH
      }
    },

    confirm_password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.REGISTER_CONFIRM_PASSWORD_REQUIRED
      },
      isLength: {
        options: { min: 6, max: 50 }
      },

      custom: {
        options: (value, { req }) => {
          return value === req.body.password;
        },
        errorMessage: USERS_MESSAGES.REGISTER_CONFIRM_PASSWORD_MATCH
      }
    },

    date_of_birth: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.REGISTER_DATE_OF_BIRTH_REQUIRED
      },
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: USERS_MESSAGES.REGISTER_DATE_OF_BIRTH_INVALID
      }
    }
  })
);

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.LOGIN_EMAIL_REQUIRED
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.LOGIN_EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          // check email exists in database
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password) });
          if (!user) {
            throw new Error(USERS_MESSAGES.WRONG_EMAIL_OR_PASSWORD);
          }
          req.user = user;
          return true;
        }
      }
    },

    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.LOGIN_PASSWORD_REQUIRED
      },
      // create length validation for password
      isLength: {
        options: { min: 6, max: 50 },
        errorMessage: USERS_MESSAGES.LOGIN_PASSWORD_LENGTH
      }
    }
  })
);
