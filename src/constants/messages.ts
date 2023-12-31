export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',

  // validation messages for register
  REGISTER_NAME_REQUIRED: 'The name must not empty',
  REGISTER_NAME_STRING: 'The name must be a string',
  REGISTER_NAME_LENGTH: 'The name must be at least 3 characters',

  REGISTER_EMAIL_REQUIRED: 'The email must not empty',
  REGISTER_EMAIL_INVALID: 'The email must be a valid email',
  REGISTER_EMAIL_EXISTS: 'The email already exists',

  REGISTER_PASSWORD_REQUIRED: 'The password must not empty',
  REGISTER_PASSWORD_STRING: 'The password must be a string',
  REGISTER_PASSWORD_LENGTH: 'The password must be at least 6 characters',

  REGISTER_CONFIRM_PASSWORD_REQUIRED: 'The confirm password must not empty',
  REGISTER_CONFIRM_PASSWORD_STRING: 'The confirm password must be a string',
  REGISTER_CONFIRM_PASSWORD_MATCH: 'The password confirmation does not match.',

  REGISTER_DATE_OF_BIRTH_REQUIRED: 'The date of birth must not empty',
  REGISTER_DATE_OF_BIRTH_INVALID: 'The date of birth must be a ISO8601 date',

  // validation messages for login
  LOGIN_EMAIL_REQUIRED: 'The email must not empty',
  LOGIN_EMAIL_INVALID: 'The email must be a valid email',
  LOGIN_EMAIL_NOT_EXISTS: 'The email does not exists',
  LOGIN_PASSWORD_REQUIRED: 'The password must not empty',
  LOGIN_PASSWORD_LENGTH: 'The password must be at least 6 characters',

  // login vs register messages
  LOGIN_SUCCESSFULLY: 'Login successfully',
  REGISTER_SUCCESSFULLY: 'Register successfully',

  // create wrong email or password message
  WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password'
};
