const WheelService = {
  getAllOemWheels(knex) {
    return knex.select("*").from("inventory_wheels");
  },
  getAllCustomWheels(knex) {
    return knex.select("*").from("inventory_custom_wheels");
  },
  getOemWheelBymake(knex, make, model, year) {
    return knex
      .from("inventory_wheels")
      .select("*")
      .where({ make: make, model: model, car_year: year });
  },
  getCustomWheeBySize(knex, width, diameter, boltPattern) {
    return knex
      .from("inventory_custom_wheels")
      .select("*")
      .where({
        wheel_width: width,
        wheel_diameter: diameter,
        bolt_pattern: boltPattern,
      });
  },
  insertOemWheel(knex, wheel) {
    return knex
      .insert(wheel)
      .into("inventory_wheels")
      .returning("*")
      .then((rows) => rows[0]);
  },
  insertCustomWheel(knex, wheel) {
    return knex
      .insert(wheel)
      .into("inventory_custom_wheels")
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = WheelService;
