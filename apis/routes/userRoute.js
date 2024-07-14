import express from 'express'
import verifyToken from '../VerifyToken.js';
import { findFollowersUsers, findFollowingUsers, findUser, follow, unfollow, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/')
router.get('/following',findFollowingUsers)
router.get('/followers',findFollowersUsers)
router.get('/:id',findUser)
router.put('/follow/:id',verifyToken, follow)
router.put('/unfollow/:id',verifyToken, unfollow);
router.put('/update/:id', verifyToken,updateUser)



export default router;
