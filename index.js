const express = require("express");
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

app.use(express.json());

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
    res.status(204).json({ error: "name must be unique" });
  }
  const newPhonebook = persons.concat({
    name,
    phone,
    id: Math.max(...persons.map((p) => p.id)) + 1,
  });

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

const PORT = "3001";
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
