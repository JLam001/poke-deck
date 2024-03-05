const { User } = require("../models");
const bcrypt = require("bcrypt");

//******THIS WORKS
//MAYBE FOR ADMIN ONLY
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not retrieve User data" });
  }
};

//******THIS WORKS
const getUserProfile = async (req, res) => {
  const username = req.params.user_name; // Assuming the username is provided in the URL
  try {
    // Find the user by their username
    const user = await User.findOne({ where: { user_name: username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user is found, you can access other user details using user.user_id
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve user profile" });
  }
};

//*****THIS WORKS
const createNewUser = async (req, res) => {
  const { user_name, email, password, role } = req.body;

  try {
    // Validate request body parameters
    if (!user_name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { user_name } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists!" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user with the hashed password
    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "User could not be created" });
  }
};

//NEED TO TEST
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { user_name, email } = req.body;

  try {
    // Find the user by user ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found for ID: " + userId });
    }

    // Update user details
    if (user_name) {
      user.user_name = user_name;
    }
    if (email) {
      user.email = email;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "User could not be updated" });
  }
};

//NEED TO TEST
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);

    await user.destroy();

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "User could not be deleted" });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  createNewUser,
  updateUser,
  deleteUser,
};
