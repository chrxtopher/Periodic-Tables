const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(reservation_id, table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id })
    .returning("*");
}

module.exports = {
  list,
  create,
  read,
  update,
};
