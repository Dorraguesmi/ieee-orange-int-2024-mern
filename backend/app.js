const express = require("express");
const usersPath = require("./routes/Users");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To MongoDB..."))
  .catch((error) => console.log("Connection failed to MongoDB!", error));

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/users", usersPath);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
