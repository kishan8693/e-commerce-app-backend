import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('Database connected successfully!!')
    } catch (error) {
        console.log("database connection failed??????")
        process.exit(1);
    }
}

export default connectDb