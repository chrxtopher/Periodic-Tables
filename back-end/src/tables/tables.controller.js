const tablesService = require("./tables.service");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const table_id = Number(req.params.table_id);
  const { reservation_id } = req.body.data;
  const data = await tablesService.update(table_id, reservation_id);
  res.json({ data });
}

module.exports = {
  list,
  create,
  update,
};
