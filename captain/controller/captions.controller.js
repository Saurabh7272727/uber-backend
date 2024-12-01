const captionsController = {};
import { validationResult } from 'express-validator';
import captainModel from '../models/captions.model.js';
import blackListModel from '../models/blackList.js';

const captionRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ success: false, message: errors.array(), status: "No" });
    }

    const captionDataByFrontend = req.body;
    const { fullname, email, password, vehicle, location } = captionDataByFrontend;

    if (!fullname || !email || !password || !vehicle || !location) {
        return res.status(403).json({ success: false, message: "All field are required", status: "No" });
    }

    if (vehicle.capacity <= 1) {
        return res.status(403).json({ success: false, message: "Unvalid process are not allowed", status: "No" });
    }
    // caption email finder
    const findCaptionData = await captainModel.findOne({ email: email });
    // users email finder
    if (findCaptionData) {
        return res.status(403).json({ success: false, message: "this email are already used", status: "No" });
    }

    const hashPassword = await captainModel.hashPassword(password);
    captionDataByFrontend.password = hashPassword;

    const insertData = new captainModel(captionDataByFrontend);
    await insertData.save();
    delete insertData._doc.password;
    Object.freeze(insertData);
    const token = await insertData.generateAuthToken(insertData._id);
    return res.status(200).json({ success: true, message: "successfully create a account", status: "Ok", token: token, captain: insertData });
}

const login = async (req, res) => {
    const userData = req.body;
    const { email, password } = userData;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success: false, message: errors.array(), status: "No" });
    }
    const findCaptainData = await captainModel.findOne({ email: email }).select("+password");
    if (!findCaptainData) {
        return res.status(401).json({ success: false, message: "Invalid user", status: "No" });
    }

    const checkPassword = await findCaptainData.comparePassword(password, findCaptainData.password);
    if (!checkPassword) {
        return res.status(401).json({ success: false, message: "Invalid user", status: "No" });
    }

    delete findCaptainData._doc.password;
    const token = await findCaptainData.generateAuthToken(findCaptainData?._id);
    await blackListModel.deleteOne({ email: email });
    res.cookie('token', token);
    return res.status(200).json({ success: true, message: "successfully login captain ", status: "Yes", data: findCaptainData, token: token });
}

const profile = async (req, res) => {
    return res.status(200).json({ success: true, message: "captain profile", status: "Yes", data: req.captain });
}

const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: req.message, status: "yes" });
}




captionsController.register = captionRegister;
captionsController.login = login;
captionsController.profile = profile;
captionsController.logout = logout;
export default captionsController;