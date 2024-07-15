import express from "express";
import { getChat, getChats } from "../controllers/chatController.js";
import verifyToken from "../VerifyToken.js";
import { addChat } from "../controllers/chatController.js";
const router = express.Router();

router.get("/", verifyToken ,getChats)
router.get('/:id', verifyToken, getChat)
router.post('/add',verifyToken,addChat)


export default router;