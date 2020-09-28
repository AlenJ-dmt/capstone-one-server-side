const TiresService = {
  getAllTires(knex) {
    return knex.select("*").from("inventory_tires");
  },
  getBySize(knex, size, condition) {
    return knex
      .from("inventory_tires")
      .select("*")
      .where({ size: size, condition: condition });
  },
  insertTire(knex, tire) {
    return knex
      .insert(tire)
      .into("inventory_tires")
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = TiresService;
