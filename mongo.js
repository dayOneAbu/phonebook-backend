/* eslint-disable no-undef */
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
};
module.exports = connectDB;
