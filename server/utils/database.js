import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is connected`)
    } catch (error) {
        console.log(error)
    }
}

export default connect;