const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  phone: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});
// format the object _id returned by Mongoose  to use it as id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
