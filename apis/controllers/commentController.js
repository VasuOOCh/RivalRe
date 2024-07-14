import Comment from "../models/Comment.js";
import { createError } from "../CustomError.js"

export const addComment = async (req,res,next) => {
    try {
        if(req.body.userId != req.user.userId) return next(createError(401,"Unauthorized | Cannot add comment")) //no need | illogical authoriaztion
        const newComment = new Comment(req.body)
        await newComment.save()
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(comment.userId != req.user.userId) return next(createError(401,"Unauthorized | Cannot delete comment")) //no need | illogical authoriaztion
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted Comment");
    } catch (error) {
        next(error)
    }
}

export const getComments =async (req,res,next) => {
    try {
        const comments = await Comment.find({
            postId : req.params.id
        })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}