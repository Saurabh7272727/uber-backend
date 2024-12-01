import mongoose from 'mongoose';

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });


const blackListModel = mongoose.model('BlackList', blackListSchema);
export default blackListModel;