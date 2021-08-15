import Mongoose from "mongoose";
import config from '../config';

const connecToDB = async () => {
    try {
        await Mongoose.connect(config.URI_DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB ONLINE');
    } catch (error) {
        console.log('Error to Connect to DB');
    }
}

connecToDB();