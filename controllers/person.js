const router = require("express").Router();
const Person = require("../models/person");

router.get("/", (req, res, next) => {
  Person.find()
    .then((persons) => {
      if (!persons) {
        return res.status(404).end();
      }
      return res.status(200).send(persons);
    })
    .catch((error) => next(error));
});

router.get("/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((singlePerson) => {
      if (!singlePerson) {
        return res.status(404).end();
      }
      return res.status(200).json(singlePerson);
    })
    .catch((error) => next(error));
});

router.post("/", (req, res, next) => {
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
router.put("/:id", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
  Person.deleteOne({ id: req.params.id })
    .then((deletedPerson) => {
      res.status(200).json(deletedPerson);
    })
    .catch((error) => next(error));
});

module.exports = router;
