const mongoose = require('mongoose')
require('dotenv').config();

exports.dbConnect=async ()=>{
    await mongoose.connect(process.env.URL)
    .then(()=>console.log('database is connected'))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });
};