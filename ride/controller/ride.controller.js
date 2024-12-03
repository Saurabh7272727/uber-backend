import { publishToQueue } from '../service/rabbit.js';
import rideModel from '../models/ride.model.js';


const createRide = async (req, res) => {
    const { pickup, destination } = req.body;
    const pastRideOfUser = await rideModel.findOne({ user: req.user.data.email });
    if (pastRideOfUser?.status === 'accepted') {
        return res.json({ success: false, message: "your previous ride was accepted", status: 'No' });
    }
    await rideModel.deleteOne({ user: req.user.data.email });
    const newRide = new rideModel({
        user: req.user.data.email,
        pickup,
        destination,
        token: req.user.token
    })
    await newRide.save();
    publishToQueue("new-ride", JSON.stringify(newRide));
    res.send(newRide);
}

const acceptRide = async (req, res) => {
    const { rideId } = req.query;
    const ride = await rideModel.findById({ _id: rideId });
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }
    ride.captain = req.captain;
    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride);
}


export { createRide, acceptRide };