const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

//FOR TESTING
router.get("/", userController.getAllUsers);

//ACTUAL ROUTES
router.get("/:userId", verifyJWT, userController.getUserProfile);
router.post("/", userController.createNewUser); // No JWT verification needed here
router.delete("/", verifyJWT, userController.deleteUser); // JWT verification applied
router.patch("/:userId", verifyJWT, userController.updateUser); // JWT verification applied

module.exports = router;
