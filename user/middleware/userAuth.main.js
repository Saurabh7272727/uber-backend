import usersModel from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import blackList_token_Model from '../models/black_list.model.js';



const userAuthMain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: "UnAuthorized access", status: "No" });
    }

    const findByToken = await blackList_token_Model.findOne({ black_list_token: token });
    if (findByToken) {
        return res.status(403).json({ success: false, message: "UnAuthorized access => black listed access", status: "No" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECURE);
        const { _id } = decoded;
        const userFindByJWT = await usersModel.findById({ _id: _id });
        req.user = userFindByJWT;
        return next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "something are wrong , sorry", status: "No" });
    }

}



export { userAuthMain };