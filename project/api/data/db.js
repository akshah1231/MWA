require("./games-model");
require("./users-model");

const mongoose=require("mongoose");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected",function(){
    console.log("Mongoose Connected on",process.env.DB_NAME);
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose Disconnected on");
});

mongoose.connection.on("err",function(){
    console.log("error",+err);
});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGNT_MESSAGE);
        process.exit(0);
    })
});