import jwt from 'jsonwebtoken';
import captainModel from '../models/captions.model.js';
import mongoose from 'mongoose';

const captainAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "there are not present a token", status: "No" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECURE);
        const findCaptainData = await captainModel.findById({ _id: decoded._id });
        delete findCaptainData._doc.password;
        if (findCaptainData) {
            req.captain = findCaptainData;
            return next();
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "UnAuthorized Error", status: "No" });
    }
}


export default captainAuth;