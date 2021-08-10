import Mongoose  from "mongoose";

const connecToDB = async ()=>{
    try {
        await Mongoose.connect('mongodb://localhost:27017/products',{
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