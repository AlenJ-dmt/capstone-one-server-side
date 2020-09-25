const express = require("express");
const STORE = require("../../store");

const tiresRouter = express.Router();

tiresRouter.route("/").get((req, res, next) => {

  const { cars, years, wheelDiameter, wheelWidth, boltPatter, quantity, wheelBrands } = STORE;

  let carMakes = []
  let carModels = []

  carMakes = cars.map( car => car.make)
  carModels = cars.map( car => car.models)

  let wheelParameters = { wheelDiameter, wheelWidth,  boltPatter,  carMakes, carModels, years, quantity, wheelBrands}

    res.status(200).send(wheelParameters);

  next();
});

module.exports = tiresRouter;
