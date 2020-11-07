const knex = require("knex");
const app = require("../src/app");
const STORE = require("../store");

describe("Populates the dropdowns for car makes", () => {
  it("GET / responds with 200 containing Array of tires", () => {
    const { tireSize, tireBrands, quantity } = STORE;
    let tireParamteres = { tireSize, tireBrands, quantity };
    return supertest(app).get("/api/tires").expect(200, tireParamteres);
  });
});

describe("Populates wheel parameters", () => {
  it("GET / responds with 200 containing Array of cars", () => {
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
    return supertest(app).get("/api/wheels").expect(200, wheelParameters);
  });
});
