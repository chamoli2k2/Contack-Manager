import Mongoose  from "mongoose";

const connectDB = async () => {
    try {
        const connect = await Mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;