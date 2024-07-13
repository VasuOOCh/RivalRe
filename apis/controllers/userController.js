import { createError } from "../CustomError.js";
import User from "../models/User.js"

export const follow = async (req,res,next) => {
    try {
        if(req.params.id == req.user.userId) return next(createError(400, "Cannot follow itself"))
        const updatedUser1 = await User.findByIdAndUpdate(req.params.id, {
            $addToSet : {followers : req.user.userId}
        },{new : true});
        const updatedUser2 = await User.findByIdAndUpdate(req.user.userId, {
            $addToSet : {following : req.params.id}
        },{new : true});

        res.status(200).json({
            followedUser : updatedUser1,
            follower : updatedUser2
        })
    } catch (error) {
        next(error)
    }
}

export const unfollow = async (req,res,next) => {
    try {
        if(req.params.id == req.user.userId) return next(createError(400, "Cannot unfollow itself"))
        const updatedUser1 = await User.findByIdAndUpdate(req.params.id, {
            $pull : {followers : req.user.userId}
        },{new : true});
        const updatedUser2 = await User.findByIdAndUpdate(req.user.userId, {
            $pull : {following : req.params.id}
        },{new : true});

        res.status(200).json({
            followedUser : updatedUser1,
            follower : updatedUser2
        })
    } catch (error) {
        next(error)
    }
}

export const findUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        // console.log(user);
        if(!user) return next(createError(400, "User doesn't exist"))
        const {password, ...otherInfo} = user._doc
        res.status(200).json(otherInfo)
    } catch (error) {
        next(error)
    }
}

export const findFollowingUsers = async (req,res,next) => {
    try {
        // console.log(req.query);
        const queryObj = {}
        if(req.query.userId) {
            const user = await User.findById(req.query.userId);

            queryObj._id = {$in : user.following}
        }

        const users = await User.find(queryObj)
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        res.status(200).json(usersWithoutPasswords)
    } catch (error) {
        next(error)
    }
}

export const findFollowersUsers = async (req,res,next) => {
    try {
        // console.log(req.query.userId);
        const queryObj = {}
        if(req.query.userId) {
            const user = await User.findById(req.query.userId);
            // console.log(user);
            queryObj._id = {$in : user.followers}
        }

        const users = await User.find(queryObj);
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        res.status(200).json(usersWithoutPasswords)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req,res,next) => {
    try {
        if(req.user.userId != req.params.id) return next(createError(401,"Unauthorized | Cannot update user"))
        // console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new : true})
        // console.log(updatedUser);

        const {password, ...otherInfo} = updatedUser._doc
        res.status(200).json(otherInfo)
    } catch (error) {
        next(error)
    }
}