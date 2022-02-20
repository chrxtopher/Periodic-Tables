const reservationsService = require("./reservations.service");

async function list(req, res) {
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

async function read(req, res, next) {
  const data = res.locals.reservation;
  res.json({ data });
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

// function checkFirstName(req, res, next) {
//   const {
//     data: { first_name },
//   } = req.body;

//   if (!first_name) {
//     return next({
//       status: 400,
//       message: "A first_name is required.",
//     });
//   }

//   if (first_name.replace(/\s+/g, "") === "") {
//     return next({
//       status: 400,
//       message: "First name cannot be blank.",
//     });
//   }

//   next();
// }

function checkReservationTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;

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
  create: [
    checkForData,
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkReservationDate,
    checkReservationTime,
    create,
  ],
  read: [reservationExists, read],
};
