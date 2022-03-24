const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:false},
    profile_pic:[{type:String,required:false}]
},
{
    versionKey:false
} 
)

module.exports = mongoose.model("user",userSchema)