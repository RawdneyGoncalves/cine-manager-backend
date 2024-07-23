import { Router } from 'express';
import { PasswordResetController } from '../controllers/passwordResetController';

const router = Router();

router.post('/initiate', PasswordResetController.initiatePasswordReset);
router.post('/reset/:token', PasswordResetController.resetPassword);

export default router;