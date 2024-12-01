const captionsController = {};
import { validationResult } from 'express-validator';
import captainModel from '../models/captions.model.js';
import usersModel from '../models/users.model.js';



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
    const findUserData = await usersModel.findOne({ email: email });
    if (findCaptionData || findUserData) {
        return res.status(403).json({ success: false, message: "this email are already used", status: "No" });
    }

    const hashPassword = await captainModel.hashPassword(password);
    captionDataByFrontend.password = hashPassword;

    const insertData = new captainModel(captionDataByFrontend);
    await insertData.save();

    Object.freeze(insertData);
    const token = await insertData.generateAuthToken(insertData._id, email);
    return res.status(200).json({ success: true, message: "successfully create a account", status: "Ok", token: token });
}



captionsController.register = captionRegister;
export default captionsController;