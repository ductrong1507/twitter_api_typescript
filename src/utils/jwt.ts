import jwt from 'jsonwebtoken';

export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVARE_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: any;
  privateKey?: string;
  options?: jwt.SignOptions;
}) => {
  // use jwt to sign asynchronously
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        throw reject(err);
      }
      resolve(token as string);
    });
  });
};
