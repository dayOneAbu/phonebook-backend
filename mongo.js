const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://bukiAtlas:${password}@cluster0.qcniqvc.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", personSchema);
if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: process.argv[3],
        phone: process.argv[4],
      });

      return person.save();
    })
    .then((person) => {
      console.log(`Added ${person.name} number ${person.phone} to phonebook!`);
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      return mongoose.connection.close();
    });
}
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    const persons = Person.find({});
    return persons;
  })
  .then((persons) => {
    console.log("phonebook:");
    persons.map((person) => {
      console.log(person.name, person.phone);
    });
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    return mongoose.connection.close();
  });
