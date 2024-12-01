import mongoose from 'mongoose';

const dataBaseConnect = async (req, res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_URL);
        if (!connect) {
            return console.log('Could not connect');
        }

        console.log('mongoose are running');
    } catch (error) {
        console.log('ERROR : ' + error.message);
    }
}

export default dataBaseConnect;
