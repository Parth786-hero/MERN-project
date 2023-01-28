const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`)
    .then(()=>{
        console.log("Database connection is successful ....");
    })
    .catch((e)=>{
        console.log(e);
    })