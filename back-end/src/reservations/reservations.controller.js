/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const { reservation_date } = req.query;
  const data = reservation_date
    ? await reservationsService.listByDate(reservation_date)
    : await reservationsService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create,
};
