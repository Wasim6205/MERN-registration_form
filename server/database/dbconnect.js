const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("db connection successful");
    })
    .catch((error) => {
        console.log("issue in db connection");
        process.exit(1);
    })
}

module.exports =dbConnect;