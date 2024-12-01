import { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userModel = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }
    },
    password: {
        type: String,
        required: true,
        min: [8, 'at least enter 8 characters of the password'],
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userModel.methods.genrateAuthToken = async (id) => {
    const token = jwt.sign({ _id: id }, process.env.JWT_SECURE, { expiresIn: '24h' });
    return token;
}

userModel.methods.comparePasswords = async (formPassword, realPassword) => {
    return await bcrypt.compare(formPassword, realPassword);
}


userModel.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}


const usersModel = mongoose.model('user', userModel);
export default usersModel;


