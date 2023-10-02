import Users from '~/models/schemas/User.schema';
import databaseService from './database.services';

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const result = await databaseService.users.insertOne(
      new Users({
        email: 'email_new.com.vn',
        password: 'sadasd'
      })
    );

    return result;
  }
}

const usersService = new UsersService();

export default usersService;
