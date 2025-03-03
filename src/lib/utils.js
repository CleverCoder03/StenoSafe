import mongoose from "mongoose"

const connection = {}

export const connectToDB = async () => {
    try{
        if(connection.isConnected){
            console.log('Using existing connection');
            console.log("Connected to database:", mongoose.connection.name);
            return;
        }
        const db = await mongoose.connect(process.env.MONGO)
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        console.log(error); 
        throw new Error('Error connecting to database');
    }
}