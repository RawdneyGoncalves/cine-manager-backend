import { User } from '../models/userModel';
import MySQLDataSource from '../ormconfig';
import bcrypt from 'bcryptjs';

const userRepository = MySQLDataSource.getRepository(User);

export class UserService {
  static async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    await user.hashPassword(password);
    return userRepository.save(user);
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    return userRepository.findOneBy({ email });
  }

  static async getUserById(id: number): Promise<User | undefined> {
    return userRepository.findOneBy({ id });
  }

  static async updateUser(id: number, name: string, email: string, password: string): Promise<User | undefined> {
    const user = await userRepository.findOneBy({ id });
    if (!user) return undefined;
    user.name = name;
    user.email = email;
    await user.hashPassword(password);
    return userRepository.save(user);
  }

  static async deleteUser(id: number): Promise<boolean> {
    const result = await userRepository.delete(id);
    return result.affected === 1;
  }
}
