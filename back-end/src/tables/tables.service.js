const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function update(reservation_id, table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id })
    .returning("*");
}

function finishTable(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null })
    .returning("*");
}

module.exports = {
  list,
  create,
  read,
  update,
  finishTable,
};
