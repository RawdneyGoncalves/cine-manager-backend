import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { UserService } from './userService';

const DEFAULT_RESET_TOKEN_EXPIRATION = '1h';
const EMAIL_USER = 'mendesrawdney@gmail.com';
const EMAIL_PASSWORD = 'rawdney29042002159357789963321147789';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
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

    static async sendResetEmail(email: string, resetToken: string): Promise<void> {
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Password reset email sent to ${email}`);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }

    static async initiatePasswordReset(email: string, secret: string): Promise<boolean> {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = this.generateResetToken(user.id, secret);
        await this.sendResetEmail(email, resetToken);
        return true;
    }

    static async resetPassword(token: string, newPassword: string, secret: string): Promise<boolean> {
        try {
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
        } catch (error) {
            console.error('Error resetting password:', error);
            throw new Error('Failed to reset password');
        }
    }
}
