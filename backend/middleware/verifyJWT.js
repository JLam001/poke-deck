const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!decoded || !decoded.UserInfo) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Store the entire UserInfo object
    req.user = decoded.UserInfo;
    next();
  });
};

module.exports = verifyJWT;
