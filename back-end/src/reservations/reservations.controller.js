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

////////////////
// VALIDATION //
////////////////

function checkReservationDate(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;
  const dateToCheck = new Date(`${reservation_date}`);
  const today = new Date();

  if (dateToCheck < today) {
    next({
      status: 404,
      message: "You cannot make reservations for a date in the past.",
    });
  }

  next();
}

module.exports = {
  list,
  create: [checkReservationDate, create],
};
