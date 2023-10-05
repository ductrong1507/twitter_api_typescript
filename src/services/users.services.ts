import Users from '~/models/schemas/User.schema';
// import databaseService from './database.services';
import { RegisterReqBody } from '~/models/requests/User.requests';
import databaseService from '~/services/database.services';

class UsersService {
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new Users({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth)
      })
    );

    return result;
  }

  async checkEmailExists(email: string) {
    const result = await databaseService.users.findOne({ email });
    // i want return true or false
    return Boolean(result);
  }
}

const usersService = new UsersService();

export default usersService;
