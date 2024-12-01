import { request } from 'express';
import blackListModel from '../models/blackList.js';
import captainModel from '../models/captions.model.js';

import jwt from 'jsonwebtoken';

const captainBlackList = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "UnAuthorized access", status: "No" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECURE);
        const findData = await captainModel.findById(decode._id);
        const OBJ = {
            token,
            email: findData.email,
        }
        const insertData = new blackListModel(OBJ);
        await insertData.save().then(() => {
            req.message = "Successfully blocked the account"
            return next();
        });

    } catch (error) {
        return res.status(401).json({ success: false, message: "UnAuthorized access", status: "No" });
    }
}


export default captainBlackList;