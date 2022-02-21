const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  const data = res.locals.table;
  res.json({ data });
}

async function update(req, res) {
  const table_id = Number(req.params.table_id);
  const { reservation_id } = req.body.data;
  const data = await tablesService.update(reservation_id, table_id);
  res.json({ data });
}

async function deleteSeat(req, res) {
  /*
  clears the seating arrangement for a table
  - does not delete the whole table from the database - 
  */
  const { table_id } = req.params;
  const reservation_id = res.locals.table.reservation_id;
  const data = await tablesService.finishTable(table_id, reservation_id);
  res.status(200).json({ data });
}

////////////////
// VALIDATION //
////////////////

function checkData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "A data key is required in the request body.",
    });
  }

  next();
}

async function tableExists(req, res, next) {
  const table_id = Number(req.params.table_id);
  const table = await tablesService.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  } else {
    return next({
      status: 404,
      message: `Table ${table_id} does not exist.`,
    });
  }
}

function checkTableName(req, res, next) {
  const {
    data: { table_name },
  } = req.body;

  if (!table_name) {
    return next({
      status: 400,
      message: "A table_name is required.",
    });
  }

  if (table_name.replace(/\s+/g, "") === "") {
    return next({
      status: 400,
      message: "Table name cannot be blank.",
    });
  }

  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "table_name must be at least 2 characters long.",
    });
  }
  next();
}

function checkTableCapacityPOST(req, res, next) {
  // checks capacity value when creating a new table
  const {
    data: { capacity },
  } = req.body;

  if (!capacity || capacity < 0) {
    return next({
      status: 400,
      message: "A capacity greater than zero is required.",
    });
  }

  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity must be a number.",
    });
  }

  next();
}

function checkTableCapacityPUT(req, res, next) {
  // checks the table capacity when updating an existing table
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message:
        "This table's capacity is not large enough for that reservation.",
    });
  }

  next();
}

async function reservationExists(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;

  if (!reservation_id) {
    return next({
      status: 400,
      message: "reservation_id is required.",
    });
  }

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

function checkIfTableIsOccupied(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;
  if (table.reservation_id) {
    return next({
      status: 400,
      message: "This table is currently occupied.",
    });
  }

  if (reservation.status === "seated") {
    return next({
      status: 400,
      message: "This reservation is already seated.",
    });
  }

  next();
}

function validateClearTable(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "This table is not occupied.",
    });
  }
  next();
}

module.exports = {
  list,
  create: [checkData, checkTableName, checkTableCapacityPOST, create],
  read: [tableExists, read],
  update: [
    checkData,
    reservationExists,
    tableExists,
    checkIfTableIsOccupied,
    checkTableCapacityPUT,
    update,
  ],
  finishTable: [tableExists, validateClearTable, deleteSeat],
};
