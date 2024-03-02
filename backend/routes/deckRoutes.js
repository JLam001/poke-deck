const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const verifyJWT = require("../middleware/verifyJWT");

//FOR TESTING
router.get("/", deckController.getAllDecks);

router
  .route("/")
  .get(verifyJWT, deckController.getDeck)
  .post(deckController.createNewDeck);

router
  .route("/:deckId")
  .patch(verifyJWT, deckController.updateDeck)
  .delete(verifyJWT, deckController.deleteDeck);

module.exports = router;
