const mongoose = require("mongoose") // Using Mongoose to Handle MongoDB Connection
const dotenv = require('dotenv');


dotenv.config()// receving files form .env

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)// function of mongoose that allows us to connect to mongoDB.
        console.log("Connected to MongoDb Sucessfully")

    } catch (error) {
        console.log({ error: "Unable to Connect" });
    }
}

module.exports = connectToMongo;