import jwt fro';
import { UserService } from './userService';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
    static async login(email: string, password: string): Promise<string | null> {
        const user = await UserService.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            return token;
        }
        return null;
    }

    static verifyToken(token: string): any {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (err) {
            return null;
        }
    }
}
