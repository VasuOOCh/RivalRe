import express from 'express'
import verifyToken from '../VerifyToken.js';
import { addStory, deleteStory, getStories, getViewedUser, viewStory } from '../controllers/storyController.js';
const router = express.Router();

router.post('/',verifyToken,addStory );
router.put('/view/:id',verifyToken, viewStory);
router.delete('/:id',verifyToken,deleteStory)
router.get('/', getStories);
router.get('/users/:id',verifyToken,getViewedUser)

export default router;
