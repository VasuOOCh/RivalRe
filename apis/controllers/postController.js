import { createError } from "../CustomError.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const addPost = async (req,res,next) =>{
    try {
        // console.log(req.body);

        const newPost = new Post({
            ...req.body,
            userId : req.user.userId
        })
        await newPost.save();
        // console.log(newPost);
        res.status(201).json(newPost)

    } catch (error) {
        next(error)
    }
}

export const getPosts = async (req,res,next) => {
    try {
        const queryObj = {}
        // console.log(req.query.userId);
        if(req.query.userId) {
            queryObj.userId = req.query.userId

        }
        const posts = await Post.find(queryObj)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

export const getSubPosts = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.userId)

        const posts = await Post.find({
            userId : {$in : user.following}
        })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}


export const getPost = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return next(createError(400, "No such post exits"))
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

export const like = async (req,res,next) => {
    try {
       const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $addToSet : {likes : req.user.userId},
        $pull : {dislikes : req.user.userId}
       }, {new : true})

    //    console.log(newPost);
    res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}

export const dislike = async (req,res,next) => {
    try {
       const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $addToSet : {dislikes : req.user.userId},
        $pull : {likes : req.user.userId}
       }, {new : true})

    //    console.log(newPost);
    res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.id)
       if(req.user.userId != post.userId) return next(createError(401, "Unauthorized | You cannot delete this post"));

       await Post.findByIdAndDelete(req.params.id)
       res.status(200).json("post deleted")
    } catch (error) {
        next(error)
    }
}

export const viewPost = async (req,res,next) => {
    try {

    } catch (error) {
        next(error)
    }
}



