require("dotenv").config();

const express = require("express");
const app = express();
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/user", require("./routes/userRoutes"));
app.use("/deck", require("./routes/deckRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Database Connected!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
