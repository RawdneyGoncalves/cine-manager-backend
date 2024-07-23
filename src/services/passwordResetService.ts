import { UserService } from './userService';
import jwt from 'jsonwebtoken';

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET || 'your_reset_password_secret';
const RESET_TOKEN_EXPIRATION = '1h';

export class PasswordResetService {
    static generateResetToken(userId: number): string {
        const token = jwt.sign({ userId }, RESET_PASSWORD_SECRET, { expiresIn: RESET_TOKEN_EXPIRATION });
        return token;
    }

    static verifyResetToken(token: string): any {
        try {
            const decoded = jwt.verify(token, RESET_PASSWORD_SECRET);
            return decoded;
        } catch (err) {
            return null;
        }
    }

    static async sendResetEmail(user: any, resetToken: string): Promise<void> {
        // Simular envio de email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        console.log(`Send email to ${user.email} with reset URL: ${resetUrl}`);
        // Aqui você implementaria o envio real de e-mails
    }

    static async initiatePasswordReset(email: string): Promise<boolean> {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = this.generateResetToken(user.id);
        await this.sendResetEmail(user, resetToken);
        return true;
    }

    static async resetPassword(token: string, newPassword: string): Promise<boolean> {
        const decoded = this.verifyResetToken(token);
        if (!decoded) {
            throw new Error('Invalid or expired token');
        }
        const user = await UserService.getUserById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.hashPassword(newPassword);
        await UserService.updateUser(user.id, user.name, user.email, newPassword);
        return true;
    }
}
