import { connect } from 'mongoose';
import "dotenv/config";

const connectDB = async () => {
    const MongoURI = <string>process.env.MONGO;
    try {
        await connect(MongoURI)
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
    }
};

export default connectDB;
