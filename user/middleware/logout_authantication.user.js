import blackList_token_Model from '../models/black_list.model.js';
import jwt from 'jsonwebtoken';
import usersModel from '../models/users.model.js';


const logoutAuthantication = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorized", status: "No" });
    }


    try {
        const decode = jwt.verify(token, process.env.JWT_SECURE);
        const findUserData = await usersModel.findOne({ _id: decode._id });
        if (!findUserData) {
            return res.status(403).json({ success: false, message: "Unauthorized", status: "No" });
        }

        const blackListOBJ = {
            black_list_token: token,
            email: findUserData.email,
            userid: findUserData._id,
        }

        const insertedData = blackList_token_Model(blackListOBJ);
        await insertedData.save().then(() => {
            req.token = token;
            return next();
        });

    } catch (err) {
        if (err) return res.status(403).json({ success: false, message: "Unauthorized", status: "No" });
    }


}


export default logoutAuthantication;