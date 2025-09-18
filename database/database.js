const mongoose = require ('mongoose')
const dotenv = require('dotenv')
dotenv.config()

async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {dbname: 'library_db'})
        console.log('Connected to MongoDB with Mongoose')
    }catch(error){
        console.error(error.stack)
    }
}

module.exports = {dbConnect}