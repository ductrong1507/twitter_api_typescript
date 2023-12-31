import { ObjectId } from 'mongodb';
import { UserVerifyStatus } from '~/constants/enums';

// enum UserVerifyStatus {  // chuyển qua file constants/enums.ts
//   Unverified, // chưa xác thực email, mặc định = 0
//   Verified, // đã xác thực email
//   Banned // bị khóa
// }
interface UserType {
  _id?: ObjectId;
  name: string;
  email: string;
  date_of_birth: Date;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  email_verify_token?: string; // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string; // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus;

  bio?: string; // optional
  location?: string; // optional
  website?: string; // optional
  username?: string; // optional
  avatar?: string; // optional
  cover_photo?: string; // optional
}

class Users {
  _id?: ObjectId;
  name: string;
  email: string;
  date_of_birth: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
  email_verify_token: string; // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string; // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus;

  bio: string; // optional
  location: string; // optional
  website: string; // optional
  username: string; // optional
  avatar: string; // optional
  cover_photo: string; // optional

  constructor(user: UserType) {
    // tạo thời gian khỏi tạo
    const dateInit = new Date();

    this._id = user._id;
    this.name = user.name || '';
    this.email = user.email;
    this.date_of_birth = user.date_of_birth || new Date();
    this.password = user.password;
    this.created_at = user.created_at || dateInit;
    this.updated_at = user.updated_at || dateInit;
    this.email_verify_token = user.email_verify_token || '';
    this.forgot_password_token = user.forgot_password_token || '';
    this.verify = user.verify || UserVerifyStatus.Unverified;
    this.bio = user.bio || '';
    this.location = user.location || '';
    this.website = user.website || '';
    this.username = user.username || '';
    this.avatar = user.avatar || '';
    this.cover_photo = user.cover_photo || '';
  }
}

export default Users;
