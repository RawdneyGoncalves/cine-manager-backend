import nodemailer from 'nodemailer';
import { UserService } from './userService';
import jwt from 'jsonwebtoken';
import { getMaxListeners } from 'events';

const DEFAULT_RESET_TOKEN_EXPIRATION = '1h';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mendesrawdney@gmail.com',
        pass: 'rawdney29042002159357789963321147789',
    },
});

export class PasswordResetService {
    static generateResetToken(userId: number, secret: string, expiresIn: string = DEFAULT_RESET_TOKEN_EXPIRATION): string {
        const token = jwt.sign({ userId }, secret, { expiresIn });
        return token;
    }

    static verifyResetToken(token: string, secret: string): any {
        try {
            const decoded = jwt.verify(token, secret);
            return decoded;
        } catch (err) {
            return null;
        }
    }

    static async sendResetEmail(user: any, resetToken: string): Promise<void> {
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
        };

        await transporter.sendMail(mailOptions);
    }

    static async initiatePasswordReset(email: string, secret: string): Promise<boolean> {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = this.generateResetToken(user.id, secret);
        await this.sendResetEmail(user, resetToken);
        return true;
    }

    static async resetPassword(token: string, newPassword: string, secret: string): Promise<boolean> {
        const decoded = this.verifyResetToken(token, secret);
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
