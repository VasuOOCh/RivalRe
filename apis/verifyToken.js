import jwt from "jsonwebtoken";
import { createError } from "./CustomError.js";

const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(createError(401, 'Not authenticated'))

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return next(createError(400, "Invalid token"))
        // console.log('payload is ', payload);
        req.user = payload;
        next();
    });

}

export default verifyToken;