import express from 'express'
import verifyToken from '../VerifyToken.js';
import { addPost, deletePost, dislike, getPost, getPosts, getSubPosts, like } from '../controllers/postController.js';
const router = express.Router();

router.post('/',verifyToken,addPost )
router.get('/subposts',verifyToken,getSubPosts)
router.get('/:id',getPost )
router.get('/',getPosts)

router.put('/view/:id', )
router.put('/like/:id',verifyToken, like)
router.put('/dislike/:id',verifyToken, dislike)
router.delete('/:id',verifyToken,deletePost ) //auth


export default router;
