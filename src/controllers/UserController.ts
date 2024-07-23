import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthService } from '../services/authService';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const newUser = await UserService.createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
      const updatedUser = await UserService.updateUser(userId, name, email, password);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      const deleteResult = await UserService.deleteUser(userId);
      if (!deleteResult) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
