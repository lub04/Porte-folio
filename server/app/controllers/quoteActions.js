const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    if (req.query.purpose === "random") {
      const quotes = await tables.quote.readAllRandLimit();
      res.json(quotes[0]);
    }
    if (req.query.purpose === "all") {
      const quotes = await tables.quote.readAll();
      res.json(quotes);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const quote = req.body;

  try {
    const insertId = await tables.quote.create(quote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.quote.delete({
      id: req.params.id,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browse,
  add,
  destroy,
};
