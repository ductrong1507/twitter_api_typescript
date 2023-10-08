const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422, // status 422 is used for validation error
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
} as const;

export default HTTP_STATUS;
