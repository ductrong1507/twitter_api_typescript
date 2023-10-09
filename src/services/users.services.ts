import Users from '~/models/schemas/User.schema';
// import databaseService from './database.services';
import { RegisterReqBody } from '~/models/requests/User.requests';
import databaseService from '~/services/database.services';
import { hashPassword } from '~/utils/crypto';
import { signToken } from '~/utils/jwt';
import { TokenType } from '~/constants/enums';
import { ObjectId } from 'mongodb';
import RefreshToken from '~/models/schemas/RefreshToken.schema';

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES
      }
    });
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES
      }
    });
  }

  async checkEmailExists(email: string) {
    const result = await databaseService.users.findOne({ email });
    // i want return true or false
    return Boolean(result);
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new Users({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    );

    const user_id = result.insertedId.toString();
    // sign token use promise all
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ]);

    // save refresh token to database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken
      })
    );

    return {
      accessToken,
      refreshToken
    };
  }

  // login function
  async login(user_id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ]);

    // save refresh token to database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken
      })
    );

    return {
      accessToken,
      refreshToken
    };
  }
}

const usersService = new UsersService();

export default usersService;
