const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
// format the object _id returned by Mongoose  to use it as id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    console.log(returnedObject);
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
