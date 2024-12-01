import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL).then(() => {
            console.log("mongo are connect with user-ride database");
        })
    } catch (e) {
        console.log("ride monngoose problems" + " " + e);
    }

}

export default connectDatabase; 