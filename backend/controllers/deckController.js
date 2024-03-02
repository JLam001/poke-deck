const { User, Deck } = require("../models");

//NEED TO TEST
const getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"], // Specify the field you want to include
        },
      ],
    });

    return res.json(decks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not retrieve Deck data" });
  }
};

//NEED TO TEST
const getDeck = async (req, res) => {
  const deckId = req.params.deckId;

  try {
    const deck = await Deck.findByPk(deckId);

    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    return res.json(deck);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve deck profile" });
  }
};

//NEED TO TEST
const createNewDeck = async (req, res) => {
  const { user_id, deck_name, body } = req.body;
  try {
    if (!deck_name || !body || !user_id) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    //Checks and finds user by Primary Key
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the deck associated with the user
    const deck = await Deck.create({ deck_name, user_id, body });

    return res.status(201).json(deck);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Deck could not be created" });
  }
};

//NEED TO TEST
const updateDeck = async (req, res) => {
  const { deckId, deck_name, body } = req.body; // Assuming you also receive the deckId in the request body
  try {
    // Find the deck by deck ID
    const deck = await Deck.findByPk(deckId);
    if (!deck) {
      return res
        .status(404)
        .json({ error: "Deck not found for ID: " + deckId });
    }

    if (deck_name) {
      deck.deck_name = deck_name;
    }
    if (body) {
      deck.body = body;
    }

    await deck.save();
    return res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Deck could not be updated" });
  }
};

//NEED TO TEST
const deleteDeck = async (req, res) => {
  const deckId = req.params.deckId;
  try {
    const user = await User.findByPk(deckId);

    await user.destroy();

    return res.json({ message: "Deck deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Deck could not be deleted" });
  }
};

module.exports = {
  getAllDecks,
  getDeck,
  createNewDeck,
  updateDeck,
  deleteDeck,
};
