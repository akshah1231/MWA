require("dotenv").config();
require("./api/data/db");
const routes=require("./api/routes/index");
const express=require("express");

const app=express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));


app.use("/api",routes);

// const server=app.listen(process.env.PORT,function(){
//     console.log("Listening on port ",server.address().port);
// });


const server=app.listen(process.env.PORT,function(){
    console.log("Listening on port ",server.address().port);
});