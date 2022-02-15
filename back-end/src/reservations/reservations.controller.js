/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const { date } = req.query;
  const data = date
    ? await reservationsService.listByDate(date)
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
    data: { reservation_date, reservation_time },
  } = req.body;
  const dateToCheck = new Date(`${reservation_date} ${reservation_time}`);
  const today = new Date();

  if (dateToCheck.getUTCDay() === 2) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesday. ${reservation_date} is on a Tuesday`,
    });
  }

  if (dateToCheck < today) {
    return next({
      status: 400,
      message: "You cannot make reservations for a date in the past.",
    });
  }
  next();
}

function checkReservationTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;

  if (reservation_time < "10:30:00") {
    return next({
      status: 400,
      message:
        "Please schedule your reservation at or after opening time. (10:30 AM)",
    });
  }

  if (reservation_time > "21:30:00") {
    return next({
      status: 400,
      message: "Please schedule your reservation before 9:30 PM.",
    });
  }

  next();
}

module.exports = {
  list,
  create: [checkReservationDate, checkReservationTime, create],
};
