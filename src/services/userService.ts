import { User } from '../models/userModel.ts';

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }
}
