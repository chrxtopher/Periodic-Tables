const tablesService = require("./tables.service");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

module.exports = {
  list,
};
