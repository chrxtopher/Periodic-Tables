const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res, next) {
  const data = res.locals.table;
  res.json({ data });
}

async function update(req, res, next) {
  const table_id = Number(req.params.table_id);
  const { reservation_id } = req.body.data;
  const data = await tablesService.update(reservation_id, table_id);
  res.json({ data });
}

////////////////
// VALIDATION //
////////////////

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

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
}

module.exports = {
  list,
  create,
  read: [tableExists, read],
  update,
};
