const mongoose=require('mongoose');


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected `);

    }
    catch (error) {
        console.log("MONGODB connection FAILED",error);
        process.exit(1);

    }
}

module.exports = connectDB
