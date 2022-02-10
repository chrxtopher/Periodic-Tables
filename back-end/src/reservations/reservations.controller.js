/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const data = await reservationsService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create();
  res.status(201).json({ data });
}

module.exports = {
  list,
  create,
};
