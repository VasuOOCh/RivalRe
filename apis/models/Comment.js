import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    desc : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    postId : {
        type : mongoose.Types.ObjectId,
        required : true
    },


}, {timestamps :true})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;