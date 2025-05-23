import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexion con la base de datos exitosa')
    } catch (err) {
        console.error('error al conectarse con la base de datos', err)
    }
}