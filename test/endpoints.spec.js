const knex = require("knex");
const app = require("../src/app");
const STORE = require("../store");

describe("Populates the dropdowns for car makes", () => {
  it("GET / responds with 200 containing Array of cars", () => {
    const { tireSize, tireBrands, quantity } = STORE;
    let tireParamteres = { tireSize, tireBrands, quantity };
    return supertest(app).get("/api/tires").expect(200, tireParamteres);
  });
});
