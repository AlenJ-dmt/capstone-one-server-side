const express = require("express");
const STORE = require("../../store");

const tiresRouter = express.Router();

tiresRouter.route("/").get((req, res, next) => {
  const { mode } = req.query;
  const { tireSize, tireBrands, quantity } = STORE;

  let tireParamteres = { tireSize, tireBrands, quantity }
  
    res.send(tireParamteres);


  next();
});

module.exports = tiresRouter;
