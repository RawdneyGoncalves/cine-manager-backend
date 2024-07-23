import { Request, Response } from 'express';
import { PasswordResetService } from '../services/passwordResetService';

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET || 'your_reset_password_secret';

export class PasswordResetController {
    static async initiatePasswordReset(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const result = await PasswordResetService.initiatePasswordReset(email, RESET_PASSWORD_SECRET);
            res.status(200).json({ message: 'Password reset email sent', success: result });
        } catch (error) {
            res.status(500).json({ message: error}); 
        }
    }

    static async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { newPassword } = req.body;
        try {
            const result = await PasswordResetService.resetPassword(token, newPassword, RESET_PASSWORD_SECRET);
            res.status(200).json({ message: 'Password reset successfully', success: result });
        } catch (error) {
            res.status(500).json({ message: error}); 
        }
    }
}
