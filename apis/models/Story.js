import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
    desc : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    images : [],
    viewedBy : [
        {
            type : mongoose.Types.ObjectId,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 12*60*60 } // This will remove the document 
    }
}, {timestamps : true})

storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 12*60*60 });

const Story = mongoose.model('Story', storySchema);
export default Story;