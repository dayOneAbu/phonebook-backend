require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./mongo");
const errorHandler = require("./middlewares/errorHandler");
const Person = require("./models/person");
const personRouter = require("./controllers/person");
const middleware = require("./utils/middleware");
const app = express();
connectDB();

// eslint-disable-next-line no-unused-vars
morgan.token("payload", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);

// routes
app.use("/api/persons", personRouter);
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

module.exports = app;
