const reservationsService = require("./reservations.service");
const VALID_STATUS = ["booked", "seated", "finished", "cancelled"];
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listByDate(date);
  } else if (mobile_number) {
    data = await reservationsService.search(mobile_number);
  } else {
    data = await reservationsService.list();
  }
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const reservation = {
    ...req.body.data,
    reservation_id,
  };
  const data = await reservationsService.update(reservation);
  res.json({ data });
}

async function updateStatus(req, res, next) {
  const reservation_id = res.locals.reservation.reservation_id;
  const {
    data: { status },
  } = req.body;
  const data = await reservationsService.updateStatus(reservation_id, status);
  res.status(200).json({ data });
}

////////////////
// VALIDATION //
////////////////

function checkForData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "All data fields are required.",
    });
  }
  next();
}

function checkFirstName(req, res, next) {
  const {
    data: { first_name },
  } = req.body;

  if (!first_name) {
    return next({
      status: 400,
      message: "A first_name is required.",
    });
  }

  if (first_name.replace(/\s+/g, "") === "") {
    return next({
      status: 400,
      message: "First name cannot be blank.",
    });
  }

  next();
}

function checkLastName(req, res, next) {
  const {
    data: { last_name },
  } = req.body;

  if (!last_name) {
    return next({
      status: 400,
      message: "A last_name is required.",
    });
  }

  if (last_name.replace(/\s+/g, "") === "") {
    return next({
      status: 400,
      message: "Last name cannot be blank.",
    });
  }

  next();
}

function checkMobileNumber(req, res, next) {
  const {
    data: { mobile_number },
  } = req.body;

  if (!mobile_number) {
    return next({
      status: 400,
      message: "A mobile_number is required.",
    });
  }

  if (mobile_number.replace(/\s+/g, "") === "") {
    return next({
      status: 404,
      message: "Mobile number cannot be blank.",
    });
  }

  if (/[a-zA-Z,.]/.test(mobile_number) === true) {
    return next({
      status: 400,
      message: "Mobile number can only include numbers. ( ex: 123-456-7890 )",
    });
  }

  const fixed = mobile_number.replace(/\D/g, "");
  if (fixed.length !== 10) {
    return next({
      status: 400,
      message: "Please enter a valid mobile number. ( ex: 123-456-7890 )",
    });
  }

  next();
}

async function reservationExists(req, res, next) {
  const reservation_id = Number(req.params.reservation_id);
  const reservation = await reservationsService.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist.`,
    });
  }
}

function checkReservationDate(req, res, next) {
  const {
    data: { reservation_date, reservation_time },
  } = req.body;
  const dateToCheck = new Date(`${reservation_date} ${reservation_time}`);
  const today = new Date();
  const requiredFormat = /\d\d\d\d-\d\d-\d\d/;

  if (!reservation_date) {
    return next({
      status: 400,
      message: "A reservation_date is required.",
    });
  }

  if (reservation_date.replace(/\s+/g, "") === "") {
    return next({
      status: 400,
      message: "Reservation date cannot be blank.",
    });
  }

  if (!reservation_date.match(requiredFormat)) {
    return next({
      status: 400,
      message: "reservation_date must be in this format: 'YYYY-MM-DD'",
    });
  }

  if (dateToCheck.getUTCDay() === 2) {
    return next({
      status: 400,
      message: `Please choose a reservation_date and reservation_time that is not on Tuesday. The restaurant is closed on Tuesdays.`,
    });
  }

  if (dateToCheck < today) {
    return next({
      status: 400,
      message:
        "Please schedule your reservation for a date and time in the future.",
    });
  }
  next();
}

function checkReservationTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;
  const requiredFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

  if (!reservation_time) {
    return next({
      status: 400,
      message: "A reservation_time is required.",
    });
  }

  if (reservation_time.replace(/\s+/g, "") === "") {
    return next({
      status: 400,
      message: "Reservation time cannot be blank.",
    });
  }

  if (!reservation_time.match(requiredFormat)) {
    return next({
      status: 400,
      message: "reservation_time must have the required format. ( ex: 12:30 )",
    });
  }

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

function checkPeople(req, res, next) {
  const {
    data: { people },
  } = req.body;

  if (!people) {
    return next({
      status: 400,
      message: "Please let us know how many people will be in your party.",
    });
  }

  if (people <= 0) {
    return next({
      status: 400,
      message: "Minimum of one person per reservation.",
    });
  }

  if (typeof people !== "number") {
    return next({
      status: 400,
      message: "Only include numbers for the amount of people in your party.",
    });
  }

  next();
}

function validateStatusPOST(req, res, next) {
  // validates status when creating a new reservation
  const {
    data: { status },
  } = req.body;

  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message:
        "New reservations cannot have a status of 'seated', 'finished', or 'cancelled'.",
    });
  }

  next();
}

function validateStatusPUT(req, res, next) {
  // validates status input when updating a reservation.
  const { status } = req.body.data;
  if (!VALID_STATUS.includes(status) || status === "unknown") {
    return next({
      status: 400,
      message:
        "Status unknown. Reservations can only have a status of 'booked', 'seated', 'finished', or 'cancelled'.",
    });
  }

  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated.",
    });
  }

  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    checkForData,
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkReservationDate,
    checkReservationTime,
    checkPeople,
    validateStatusPOST,
    asyncErrorBoundary(create),
  ],
  read: [reservationExists, asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkReservationDate,
    checkReservationTime,
    checkPeople,
    validateStatusPUT,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    reservationExists,
    validateStatusPUT,
    asyncErrorBoundary(updateStatus),
  ],
};
