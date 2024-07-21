import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
