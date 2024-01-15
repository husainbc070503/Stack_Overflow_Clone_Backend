import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGODB_URL
const connectToMongoDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(url, () => console.log('Successfully Connected to MongoDB'));
    } catch (error) {
        console.log(error.message);
    }
}

export default connectToMongoDB;