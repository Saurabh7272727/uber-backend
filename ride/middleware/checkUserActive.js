import rideModel from '../models/ride.model.js';
import axios from 'axios';

const checkUserActive = async (req, res, next) => {
    const { rideId } = req.query;
    const findRideId = await rideModel.findById(rideId);
    if (!findRideId || !findRideId.token) {
        return res.status(401).json({ success: false, message: "problem in ride id" });
    }
    const URL_USER_PROFILE = "http://localhost:3000/users/profile";
    try {

        const response = await axios.get(URL_USER_PROFILE, {
            headers: {
                Authorization: `Bearer ${findRideId.token}`
            },
        })

        const result = await response.data.data;
        if (result.active) {
            return next();
        }
        await rideModel.findByIdAndDelete({ _id: rideId });
        return res.status(403).json({ success: false, message: "user are not active, sorry surviuor...", status: "No" });
    } catch (error) {
        await rideModel.findByIdAndDelete({ _id: rideId });
        return res.status(401).json({ success: false, message: "problem in ride checkUserActive", status: "No" });
    }
}


export default checkUserActive;