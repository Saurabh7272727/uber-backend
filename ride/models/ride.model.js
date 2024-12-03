import mongoose from 'mongoose';


const rideSchema = new mongoose.Schema({
    captain: {
        type: String,
    },
    user: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'started', 'completed'],
        default: 'requested'
    },
    token: {
        type: String,
    }
}, {
    timestamps: true
})


const rideModel = mongoose.model('ride', rideSchema);
export default rideModel;
