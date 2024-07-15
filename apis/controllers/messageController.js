import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const getMessages = async (req, res,next) => {
    try {
        // console.log(req.query);
        // console.log(req.userId);
        const messages = await Message.find({
            sender : {$in : [req.query.userId, req.user.userId]},
            reciever : {$in : [req.query.userId, req.user.userId]}
        });

        // console.log(messages);
        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
}


export const addMessage = async (req, res,next) => {
    try {
        // console.log(req.body);
        const newMessage = new Message(req.body);
        newMessage.save();

        const chat = await Chat.findOne({
            users: {
                $all: [newMessage.sender, newMessage.reciever]
            }
        });

        chat.messages.push(newMessage);
        chat.save();

        // console.log(chat);
        // console.log(newMessage);
        res.status(200).json("message created")
    } catch (error) {
        next(error)
    }
}
