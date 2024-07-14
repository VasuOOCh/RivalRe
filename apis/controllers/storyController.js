import { createError } from "../CustomError.js";
import Story from "../models/Story.js";
import User from "../models/User.js";


export const addStory = async (req,res,next) => {
    try {
        if(req.body.userId != req.user.userId) return next(createError(401,"Unauthorized | Cannot add story"))
        // console.log(req.body);
        const newStory = new Story({
            ...req.body,
            userId : req.user.userId
        })
        await newStory.save();
        await User.findByIdAndUpdate(req.user.userId, {
            $set : {storyAdded : true}
        })
        res.status(200).json(newStory);
    } catch (error) {
        next(error)
    }
}

export const viewStory = async (req,res,next) => {
    try {
        const updatedStory = await Story.findByIdAndUpdate(req.params.id, {
            $addToSet : {viewedBy : req.user.userId}
        }, {new : true})
        res.status(200).json(updatedStory)
    } catch (error) {
        next(error)
    }
}

export const deleteStory = async (req,res,next) => {
    try {
        const story = await Story.findById(req.params.id)
        // console.log(story);
        if(story.userId != req.user.userId) return next(createError(401,"Unauthorized | Cannot delete story"))
        
        await Story.findByIdAndDelete(req.params.id);
        res.status(200).json("Story deleted")
    } catch (error) {
        next(error);
    }
}

export const getStories = async (req,res,next) => {
    try {   
        const stories = await Story.find()
        res.status(200).json(stories)
    } catch (error) {
        next(error)
    }
}

export const getViewedUser = async (req,res,next) => {
    try {   
        const story = await Story.findById(req.params.id);
        const users = await User.find({
            _id : {$in : story.viewedBy}
        })
        // console.log(users);
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}