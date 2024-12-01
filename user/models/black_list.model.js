import mongoose from "mongoose";


const blackList_token_Schema = new mongoose.Schema({
    black_list_token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userid: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });



const blackList_token_Model = mongoose.model('blackList', blackList_token_Schema);
export default blackList_token_Model;