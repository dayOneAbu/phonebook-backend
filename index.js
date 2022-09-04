const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "wew",
    phone: "9865989856",
    id: 5,
  },
  {
    name: "wew23",
    phone: "9865989856",
    id: 6,
  },
  {
    name: "wew2323",
    phone: "9865989856qq",
    id: 7,
  },
  {
    name: "new",
    phone: "11113",
    id: 8,
  },
];
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

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const singlePerson = persons.find(
    (person) => person.id.toString() === req.params.id
  );

  res.status(200).json(singlePerson);
});
app.post("/api/persons/", (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone || persons.some((person) => person.name === name)) {
    return res.status(409).json({ error: "name must be unique" });
  }
  const generateId = (data) => {
    return data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 0;
  };
  const newPhonebook = {
    name,
    phone,
    id: generateId(persons),
  };
  persons.concat(newPhonebook);

  res.status(201).json(newPhonebook);
});
app.delete("/api/persons/:id", (req, res) => {
  const newPhonebook = persons.filter(
    (person) => person.id.toString() !== req.params.id
  );
  res.json(newPhonebook);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
