import { Collection, Db, MongoClient } from 'mongodb';
import RefreshToken from '~/models/schemas/RefreshToken.schema';
import Users from '~/models/schemas/User.schema';

class DatabaseService {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_DB_URL as string);
    this.db = this.client.db(process.env.DATABASE_NAME);
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      console.log('You successfully connected to MongoDB!');
    } catch (err) {
      console.log('err', err);
    }
  }

  // tạo getter để lấy colection user
  get users(): Collection<Users> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string);
  }

  // tạo getter để lấy colection refresh token
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string);
  }
}

const databaseService = new DatabaseService();

export default databaseService;
