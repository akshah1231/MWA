const mongoose=require("mongoose");

const publisherSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    established: String
});

const gameSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    publisher:publisherSchema
});



mongoose.model(process.env.GAME_MODEL,gameSchema,process.env.GAME_COLLECTION);
