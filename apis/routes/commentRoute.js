import express from 'express'
import verifyToken from '../VerifyToken.js';
import { addComment, deleteComment, getComments } from '../controllers/commentController.js';
const router = express.Router();

router.post('/',verifyToken,addComment )
router.delete('/:id', verifyToken, deleteComment)
router.get('/post/:id', getComments)


export default router;
