const tablesService = require("./tables.service");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create,
};
