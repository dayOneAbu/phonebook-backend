/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const connectDB = require("./mongo");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
connectDB();

morgan.token("payload", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);

// routes
app.get("/api/persons/", (req, res, next) => {
  Person.find()
    .then((persons) => {
      if (!persons) {
        return res.status(404).end();
      }
      return res.status(200).send(persons);
    })
    .catch((error) => next(error));
});
// by id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((singlePerson) => {
      if (!singlePerson) {
        return res.status(404).end();
      }
      return res.status(200).json(singlePerson);
    })
    .catch((error) => next(error));
});
//by name
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((singlePerson) => {
      if (!singlePerson) {
        return res.status(404).end();
      }
      return res.status(200).json(singlePerson);
    })
    .catch((error) => next(error));
});

app.post("/api/persons/", (req, res, next) => {
  const { name, phone } = req.body;
  Person.find({ name }).then((person) => {
    if (!name || !phone || person.length > 0) {
      return res.status(409).json({ error: "name must be unique" });
    }
    const temp = new Person({
      name,
      phone,
    });
    temp
      .save()
      .then((newPerson) => {
        res.status(201).json(newPerson);
      })
      .catch((error) => next(error));
  });
  // .catch((error) => next(error));
});
app.put("/api/persons/:id", (req, res, next) => {
  const { name, phone } = req.body;
  Person.findOneAndUpdate(
    req.params.id,
    { name, phone },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson);
    })
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  Person.deleteOne({ id: req.params.id })
    .then((deletedPerson) => {
      res.status(200).json(deletedPerson);
    })
    .catch((error) => next(error));
});
app.get("/info", (req, res) => {
  Person.find().then((persons) => {
    res.send(`
    <div><p>
    
    phone book has info for ${persons.length} people 
    <br/>
    ${new Date().toUTCString()}
    </p>
    
    </div>`);
  });
});
// handler of requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
