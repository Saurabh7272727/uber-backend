const userController = {};
import usersModel from '../models/users.model.js';
import { validationResult } from 'express-validator'
import blackList_token_Model from '../models/black_list.model.js';

const userRegister = async (req, res) => {
    const userData = req.body;
    const { fullname, email, password } = userData;

    if (!fullname?.firstname || !email || !password) {
        return res.status(401).json({ success: false, message: "All fields are required", status: "No" });
    }

    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success: false, message: errors.array(), status: "No" });
    }

    const userFindEmail = await usersModel.findOne({ email: email });
    if (userFindEmail) {
        return res.status(401).json({ success: false, message: "Email are already registerted", status: "No" });
    }
    if (password.length < 8) {
        return res.status(401).json({ success: false, message: "must be require a at least 8 characters of password", status: "No" });
    }

    const hashPassword = await usersModel.hashPassword(password);
    userData.password = hashPassword;


    Object.freeze(userData);
    const userInsertData = usersModel(userData);
    await userInsertData.save();
    delete userInsertData._doc.password;
    const token = await userInsertData.genrateAuthToken(userInsertData._id);
    if (!token) {
        return res.status(502).json({ success: false, message: "try again , something is wrong", status: "No" });
    }

    return res.status(201).json({ success: true, message: "successfully create a account", status: "Yes", data: { user: userInsertData, token } });
}


const userLogin = async (req, res) => {
    const userData = req.body;
    const { email, password } = userData;
    if (!email || !password) {
        return res.status(403).json({ success: false, message: "field are empty", status: "No" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ success: false, message: errors.array(), status: "No" });
    }

    const userFindData = await usersModel.findOne({ email: email }).select("+password");
    if (!userFindData) {
        return res.status(403).json({ success: false, message: "Invalid user", status: "No" });
    }
    userFindData.active = !userFindData.active;
    await userFindData.save();
    const securityForServer = {};
    securityForServer.email = userFindData.email;
    securityForServer.fullname = userFindData.fullname;

    const checkPassword = await userFindData.comparePasswords(password, userFindData.password);
    if (!checkPassword) {
        return res.status(403).json({ success: false, message: "Invalid user", status: "No" });
    }

    const token = await userFindData.genrateAuthToken(userFindData._id);
    res.cookie('token', token);

    await blackList_token_Model.deleteOne({ userid: userFindData?._id });
    return res.status(200).json({ success: true, message: "successfully login ", status: "Yes", data: securityForServer, token: token });
}

const userProfile = async (req, res) => {
    return res.status(200).json({ success: true, message: "profile", token: req.token, data: req.user });
}


const userlogout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "successfully logout", status: "Yes" });
}




// controller section of this.path;
userController.userRegister = userRegister;
userController.userLogin = userLogin;
userController.userProfile = userProfile;
userController.userlogout = userlogout;
export default userController;