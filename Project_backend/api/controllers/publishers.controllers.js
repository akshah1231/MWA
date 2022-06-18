const { response } = require("express");
const mongoose=require("mongoose");
const Game=mongoose.model(process.env.GAME_MODEL);

const getOne=function(req,res){
    console.log("getting one publisher controller");
    const gameId=req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        const response={status:200,message:game.publisher};
        if(err){
            console.log("Error finding game");
            response.status=500;
            response.message=err;
        }else if(!game){
            console.log(("game id not found"));
            res.status(404).json({"message" : "Game ID not found"});
        }else{
            console.log("Found publihser",game.publisher,"for game",game);
        }
        res.status(response.status).json(response.message);
    });
};

const addOne=function(req,res){
    console.log("add one publisher controller");
    const gameId=req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        console.log("Found game");
        const response={staus:200,message:game};
        if(err){
            console.log("error");
            response.staus=500;
            response.message=err;
        }
        else if(!game){
            response.staus=404;
            response.message="no game id";    
        }
        if(game){
            _addPublisher(req,res,game);
        }
        res.status(response.staus).json(response.message);
    });
}

const _addPublisher=function(req,res,game){
    game.publisher.name=req.body.name;
    game.publisher.established=req.body.established;
    game.save(function(err,updatedGame){
        const response= { status: 200, message: [] };
        if (err) {
            response.status= 500;
            response.message= err;
        } else{
            response.status= 201;
            response.message= updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOne=function(req,res){
    console.log("add one publisher controller");
    const gameId=req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        console.log("Found game");
        const response={staus:200,message:game};
        if(err){
            console.log("error");
            response.staus=500;
            response.message=err;
        }
        else if(!game){
            response.staus=404;
            response.message="no game id";    
        }
        if(game){
            _deletePublisher(req,res,game);
        }
        res.status(response.staus).json(response.message);
    });
}

const _deletePublisher= function (req, res, game) {
    game.publisher = { name: "NoName" };
    game.save(function(err, updatedGame) {
    const response= {
        status: 204,
        message: []
    };
    if (err) {
        response.status= 500;
        response.message= err;
    } else {
        response.status= 201;
        response.message= updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
});
}

const updateOne=function(req,res){
    console.log("called update one");
    const gameId=req.params.gameId;
    let valid=mongoose.isValidObjectId(gameId);
    if(!valid){
        res.status(400).json({error:'not valid id'});
    }
    Game.findById(gameId).select("publisher").exec(function(err,game){
        const response={staus:200, message:game};
        if(err){
            console.log("Error finding game");
            response.staus=500;
            response.message=err;
        }else if(!game){
            console.log("no games with this id");
            response.staus=400;
            response.message={"message":"Game id not found"+game};
        }if(game){
            console.log("Found game",game);
            _updatePublisher(req,res,game);
        }else{
            res.status(response.staus).json(response.message);
        }

    });
};

const _updatePublisher=function(req,res,game){
    game.publisher.name= req.body.name; 
    game.publisher.established= req.body.established;
    Game.findByIdAndUpdate(game.id,game,function(err,updatedGame){
        const response={status:200,message:[]};
        if(err){
            response.status=500;
            response.message=err;
        }else {
            response.status=200;
            response.message=game.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports={
    getOne:getOne,
    addOne:addOne,
    deleteOne:deleteOne,
    updateOne:updateOne
}