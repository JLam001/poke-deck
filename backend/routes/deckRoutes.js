const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const verifyJWT = require("../middleware/verifyJWT");

//router.use(verifyJWT);

router
  .route("/")
  .get(deckController.getAllDecks)
  .post(deckController.createNewDeck);

router
  .route("/:deckId")
  .patch(verifyJWT, deckController.updateDeck)
  .delete(verifyJWT, deckController.deleteDeck);

module.exports = router;
