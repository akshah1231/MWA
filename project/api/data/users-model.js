const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    name:String,
    username: {
        type: String,
        required: true,
        uniqure:true
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model(process.env.USER_MODEL,userSchema,process.env.USER_COLLECTION);