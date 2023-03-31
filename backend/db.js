const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://rohitbarate100:rohitbarate100@cluster0.v3qrqzt.mongodb.net/data"

const connectToMongo = ()=>{
mongoose.connect(mongoUri, ()=>{
    console.log("connected successfully")
})

}

module.exports =  connectToMongo;