
const express=require("express");
const router=express.Router();
const gamesController=require("../controllers/games.controllers");
const publisherController=require("../controllers/publishers.controllers");

router.route("/games")
    .post(gamesController.addOne)
    .get(gamesController.getAll);
    

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdateOne)
    .delete(gamesController.deleteOne);

router.route("/games/:gameId/publisher")
    .post(publisherController.addOne)
    .get(publisherController.getOne)
    .put(publisherController.updateOne)
    .delete(publisherController.deleteOne);


router.route("/games/:gameID/publisher/:publisherId")
    .get(publisherController.getOne);

module.exports=router;