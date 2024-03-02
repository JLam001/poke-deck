const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

/**
 * @description Login
 * @route POST /auth
 * @access Public
 */

//NEED TO TEST
const login = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    //Checks if user_name or email and password are provided
    if ((!user_name && !email) || !password) {
      return res
        .status(400)
        .json({ message: "Both user_name or email and password are required" });
    }

    //Checks if the user_name or email exists
    let existingUser;
    if (user_name) {
      existingUser = await User.findOne({
        where: {
          user_name: user_name,
        },
      });
    } else if (email) {
      existingUser = await User.findOne({
        where: {
          email: email,
        },
      });
    }

    //Checks if the User exists
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Compares password from request to the password in DB
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Generates Access and Refresh Token
    const accessToken = generateToken(existingUser, ACCESS_TOKEN_SECRET, "5m");
    const refreshToken = generateToken(
      existingUser,
      REFRESH_TOKEN_SECRET,
      "1d"
    );

    //Saves Refresh Token to DB
    await existingUser.update({ refreshToken });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @description Refresh
 * @route GET /auth/refresh
 * @access Public - because access token has expired
 */

//NEED TO TEST IT
const refresh = async (req, res) => {
  try {
    const { jwt: refreshToken } = req.cookies;

    //Checks if the refresh token exists
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //Verifies the refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Forbidden" });
      }

      //Checks if the user exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { user_name: decoded.UserInfo.user_name },
            { email: decoded.UserInfo.email },
          ],
        },
      });

      if (!existingUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      //Generates Access Token
      const accessToken = generateToken(
        existingUser,
        ACCESS_TOKEN_SECRET,
        "5m"
      );
      console.log(`Generated Access Token: ${accessToken}`); // Add this line for debugging
      return res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to refresh" });
  }
};

/**
 * @description Logout
 * @route POST /auth/logout
 * @access Public - just to clear cookies if exists
 */

//WORKS
const logout = async (req, res) => {
  try {
    const jwtCookie = req.cookies?.jwt;

    //Checks if the jwt cookie exists
    if (!jwtCookie) {
      return res.sendStatus(204);
    }

    //Clears the jwt cookie
    // res
    //   .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    //   .json({ message: "Cookie cleared" });

    jwt.verify(jwtCookie, REFRESH_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        console.error(error);
        return res.status(403).json({ message: "Forbidden" });
      }
      await User.update(
        { refreshToken: null },
        {
          where: {
            email: decoded.UserInfo.email,
          },
        }
      );
      res
        .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
        .json({ message: "Cookie cleared" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to logout" });
  }
};

function generateToken(user, secret, expiresIn) {
  return jwt.sign(
    {
      UserInfo: {
        user_name: user.user_name,
        email: user.email,
        roles: user.roles,
      },
    },
    secret,
    { expiresIn }
  );
}

module.exports = {
  login,
  refresh,
  logout,
};
