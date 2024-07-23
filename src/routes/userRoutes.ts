import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { PasswordResetController } from '../controllers/passwordResetController';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.post('/password-reset', PasswordResetController.initiatePasswordReset);
router.post('/password-reset/:token', PasswordResetController.resetPassword);

export default router;
