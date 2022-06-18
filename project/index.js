require("dotenv").config();
require("./api/data/db");
const routes = require("./api/routes/index");
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
})

app.use("/api", routes);



// const server=app.listen(process.env.PORT,function(){
//     console.log("Listening on port ",server.address().port);
// });


const server = app.listen(process.env.PORT, function () {
    console.log("Listening on port ", server.address().port);
});