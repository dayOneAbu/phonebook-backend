require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const connectDB = require("./mongo");
const app = express();
connectDB();

morgan.token("payload", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons/", (req, res) => {
  Person.find().then((persons) => res.status(200).send(persons));
});
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((singlePerson) => {
    res.status(200).json(singlePerson);
  });
});

app.post("/api/persons/", (req, res) => {
  const { name, phone } = req.body;
  Person.find({ name }).then((person) => {
    if (!name || !phone || person.length > 0) {
      return res.status(409).json({ error: "name must be unique" });
    }
    const temp = new Person({
      name,
      phone,
    });
    temp.save().then((newPerson) => {
      res.status(201).json(newPerson);
    });
  });
});
app.delete("/api/persons/:id", (req, res) => {
  const deletedPerson = Person.deleteOne({ id: req.params.id });
  res.status(200).json(deletedPerson);
});
app.get("/info", (req, res) => {
  res.send(`
  <div><p>
  
  phone book has info for ${persons.length} people 
  <br/>
  ${new Date().toUTCString()}
  </p>
  
  </div>`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
