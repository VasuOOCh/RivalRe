import express from 'express'
import { logout, signin, signup } from '../controllers/authController.js';
import verifyToken from '../VerifyToken.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/signin',signin )
router.get('/logout',verifyToken,logout )
router.post('/google', )

export default router;
