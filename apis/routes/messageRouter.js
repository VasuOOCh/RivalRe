import express from "express";

import { addMessage, getMessages } from "../controllers/messageController.js";
import verifyToken from "../VerifyToken.js";
const router = express.Router();

router.get("/",verifyToken, getMessages)

router.post("/", verifyToken, addMessage)




export default router;