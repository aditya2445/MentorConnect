const mongoose = require("mongoose")

const timeSchema = new mongoose.Schema({
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },

},{timestamps:true})

module.exports = mongoose.model("TimeSlots",timeSchema)