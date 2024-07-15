import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reciever: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required : true
    },

}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);
export default Message;