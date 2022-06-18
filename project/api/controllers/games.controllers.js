const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const utils = require("./utils");


const getAll = function (req, res) {
    let offset = 0;
    let count = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
    const response = {
        status: process.env.GET_SUCCESS_CODE,
        message: {}
    }
    Game.find().skip(offset).limit(count)
        .then(games => utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, games))
        .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
        .finally(() => utils.responseRequest(response, res));
}


//     //         ).exec(function(err,games){
//     //     console.log("Fouund Games",games.length)
//     //     res.json(games);
//     // });
// };


const getOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("getting gameId", gameId);
    const response = { status: 200, message: {} };
    Game.findById(gameId)
        .then(game => {
            if (!game) {
                console.log(("game id not found"));
                res.status(404).json({ "message": "Game ID not found" });
            } else{
                utils.onSuccessMessageHandler(response, process.env.GET_SUCCESS_CODE, game);
            }
        })
        .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
        .finally(()=> utils.responseRequest(response, res));
    }


    //     .exec(function(err,game){
    //         const response={status:200,message:game};
    //         if(err){
    //             console.log("Error finding game");
    //             response.status=500;
    //             response.message=err;
    //         }else if(!game){
    //             console.log(("game id not found"));
    //             res.status(404).json({"message" : "Game ID not found"});
    //         }
    //         res.status(response.status).json(response.message);
    //     })
    // }
    const addOne = function (req, res) {
        console.log("game add request");
        const response = {
            status: 200, 
            message:{}
        }
        const newGame = {
            title: req.body.title, year: req.body.year, publisher: { name: "NoName" }
        }
        Game.create(newGame)
            .then((newGame) => utils.onSuccessMessageHandler(response, process.env.CREATE_SUCCESS_CODE, newGame))
            .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_CODE, err.message))
            .finally(()=> {
                console.log(response);
                utils.responseRequest(response, res)
    });
}
            
            
            
            
    //         function (err, game) {
    //         const response = { staus: 201, message: game };
    //         if (err) {
    //             console.log("Error creating game");
    //             response.staus500;
    //             response.message = err;
    //         } else {
    //             console.log("added game");
    //         }
    //         res.status(response.staus).json(response.message);
    //     });
    // };

    const deleteOne = function (req, res) {
        const gameId = req.params.gameId;
        const response = {
            status: 200, 
            message:{}
        }
        Game.findByIdAndDelete(gameId)
            .then(utils.onSuccessMessageHandler(response, process.env.DELETE_SUCCESS_CODE, process.env.DELETED_SUCCESS_MSG))
            .catch(err => utils.onErrorMessageHandler(response, process.env.INTERNAL_ERROR_MSG, err))
            .finally(()=> utils.responseRequest(response, res));
    }
        
    //     .exec(function (err, deletedGame) {
    //         const response = { status: 204, message: deletedGame };
    //         if (err) {
    //             console.log("Error finding game");
    //             response.status = 500;
    //             response.message = err;
    //         } else if (!deletedGame) {
    //             console.log("Game id not found");
    //             response.status = 404;
    //             response.message = {
    //                 "message": "Game ID not found"
    //             };
    //         } else {
    //             console.log("game deleated");
    //         }
    //         res.status(response.status).json(response.message);
    //     });
    // };

    const fullUpdateOne = function (req, res) {
        console.log("Full Update One Game Controller");
        gameUpdate = function (req, res, game, response) {
            game.title = req.body.title;
            game.year = req.body.year;
            if (req.body.name) {
                console.log("Name passed");
                game.publisher = { name: req.body.name };
            } else {
                console.log("No Name passed");
                game.publisher = { name: "NoName" };
            }

            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }

                res.status(response.status).json(response.message);
            });
        }
        _updateOne(req, res, gameUpdate);
    }
    const _updateOne = function (req, res, updateGameCallback) {
        console.log("Update One Game Controller");
        const gameId = req.params.gameId;
        Game.findById(gameId).exec(function (err, game) {
            const response = { status: 204, message: game };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            } else if (!game) {
                console.log("Game id not found");
                response.status = 404;
                response.message = { "message": "Game ID not found" };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                updateGameCallback(req, res, game, response);
            }
        });
    };


    module.exports = {
        getOne: getOne,
        getAll: getAll,
        addOne: addOne,
        deleteOne: deleteOne,
        fullUpdateOne: fullUpdateOne
    }