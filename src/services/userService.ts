import { User } from '../models/userModel';

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }
}
