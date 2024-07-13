import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    desc : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    likes : [
        {
            type : mongoose.Types.ObjectId,
        }
    ],
    dislikes : [
        {
            type : mongoose.Types.ObjectId,
        }
    ],
    views : {
        type : Number,
        default : 0
    },
    images : [String]
}, {timestamps :true})

const Post = mongoose.model('Post', postSchema);
export default Post;