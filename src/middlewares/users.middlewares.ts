// import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { USERS_MESSAGES } from '~/constants/messages';
import usersService from '~/services/users.services';
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
      isString: {
        errorMessage: USERS_MESSAGES.REGISTER_PASSWORD_STRING
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
      isString: {
        errorMessage: USERS_MESSAGES.REGISTER_CONFIRM_PASSWORD_STRING
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
