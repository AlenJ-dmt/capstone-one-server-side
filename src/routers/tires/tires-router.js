const express = require("express");
require("dotenv").config();
const path = require("path");
const STORE = require("../../../store");
const TiresService = require("./tires-services");
const xss = require("xss");

const tiresRouter = express.Router();
const jsonParser = express.json();

const serializedTire = (tire) => ({
  id: tire.id,
  brand: xss(tire.brand),
  size: xss(tire.size),
  quantity: xss(tire.quantity),
  condition: xss(tire.condition),
  modified: tire.modified,
});

tiresRouter.route("/").get((req, res, next) => {
  const { tireSize, tireBrands, quantity } = STORE;
  let tireParamteres = { tireSize, tireBrands, quantity };
  res.send(tireParamteres);
  next();
});

tiresRouter.route("/all").get((req, res, next) => {
  TiresService.getAllTires(req.app.get("db"))
    .then((tires) => {
      res.json(tires.map(serializedTire));
    })
    .catch(next);
});

tiresRouter.route("/search").get((req, res, next) => {
  const { size, condition } = req.query;

  if (size && condition) {
    TiresService.getBySize(req.app.get("db"), size, condition)
      .then((tires) => {
        res.json(tires.map(serializedTire));
      })
      .catch(next);
  } else {
    res.send("Missing argument");
    next();
  }
});

tiresRouter.route("/addTire").post(jsonParser, (req, res, next) => {
  const { brand, size, quantity, condition } = req.body;
  const newTire = { brand, size, quantity, condition };

  for (const [key, value] of Object.entries(newTire))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  TiresService.insertTire(req.app.get("db"), newTire)
    .then((tire) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${tire.id}`))
        .json(serializedTire(tire));
    })
    .catch(next);
});

module.exports = tiresRouter;
