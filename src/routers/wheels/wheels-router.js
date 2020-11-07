const express = require("express");
const STORE = require("../../../store");
const WheelService = require("./wheels-services");
const xss = require("xss");
const path = require("path");

const wheelsRouter = express.Router();
const jsonParser = express.json();

const serializedOemWheel = (wheel) => ({
  id: wheel.id,
  make: xss(wheel.make),
  model: xss(wheel.model),
  carYear: xss(wheel.car_year),
  wheelWidth: xss(wheel.wheel_width),
  wheelDiameter: xss(wheel.wheel_diameter),
  boltPatter: xss(wheel.bolt_pattern),
  quantity: xss(wheel.quantity),
  modified: wheel.modified,
});

const serializedCustomWheel = (wheel) => ({
  id: wheel.id,
  brand: xss(wheel.brand),
  wheelWidth: xss(wheel.wheel_width),
  wheelDiameter: xss(wheel.wheel_diameter),
  boltPatter: xss(wheel.bolt_pattern),
  quantity: xss(wheel.quantity),
  modified: wheel.modified,
});

wheelsRouter.route("/").get((req, res, next) => {
  const {
    cars,
    years,
    wheelDiameter,
    wheelWidth,
    boltPatter,
    quantity,
    wheelBrands,
  } = STORE;

  let carMakes = [];
  let carModels = [];

  carMakes = cars.map((car) => car.make);
  carModels = cars.map((car) => car.models);

  let wheelParameters = {
    wheelDiameter,
    wheelWidth,
    boltPatter,
    carMakes,
    carModels,
    years,
    quantity,
    wheelBrands,
  };

  res.status(200).send(wheelParameters);

  next();
});

wheelsRouter.route("/all").get((req, res, next) => {
  WheelService.getAllOemWheels(req.app.get("db"))
    .then((wheels) => {
      res.json(wheels.map(serializedOemWheel));
    })
    .catch(next);
});

wheelsRouter.route("/searchOem").get((req, res, next) => {
  const { year, make, model } = req.query;

  if (year && make && model) {
    WheelService.getOemWheelBymake(req.app.get("db"), make, model, year)
      .then((wheels) => {
        res.json(wheels.map(serializedOemWheel));
      })
      .catch(next);
  } else {
    res.send("Missing argument");
    next();
  }
});

wheelsRouter.route("/searchCustom").get((req, res, next) => {
  const { width, diameter, boltPattern } = req.query;

  if (width && diameter && boltPattern) {
    WheelService.getCustomWheeBySize(req.app.get("db"), width, diameter, boltPattern)
      .then((wheels) => {
        res.json(wheels.map(serializedCustomWheel));
      })
      .catch(next);
  } else {
    res.send("Missing argument");
    next();
  }
});

wheelsRouter.route("/addOemWheel").post(jsonParser, (req, res, next) => {
  const { make, model, car_year, wheel_width, wheel_diameter, bolt_pattern, quantity } = req.body;
  const newWheel = { make, model, car_year, wheel_width, wheel_diameter, bolt_pattern, quantity };

  for (const [key, value] of Object.entries(newWheel))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  WheelService.insertOemWheel(req.app.get("db"), newWheel)
    .then((wheel) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${wheel.id}`))
        .json(serializedOemWheel(wheel));
    })
    .catch(next);
});

wheelsRouter.route("/addCustomWheel").post(jsonParser, (req, res, next) => {
  const { brand, wheel_width, wheel_diameter, bolt_pattern, quantity } = req.body;
  const newWheel = { brand, wheel_width, wheel_diameter, bolt_pattern, quantity };

  for (const [key, value] of Object.entries(newWheel))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  WheelService.insertCustomWheel(req.app.get("db"), newWheel)
    .then((wheel) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${wheel.id}`))
        .json(serializedCustomWheel(wheel));
    })
    .catch(next);
});

module.exports = wheelsRouter;
