// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all quotes from the database
    if (req.query.purpose === "random") {
      const quotes = await tables.quote.readAllRandLimit();
      res.json(quotes[0]);
    }
    if (req.query.purpose === "all") {
      const quotes = await tables.quote.readAll();
      res.json(quotes);
    }

    // Respond with the quotes in JSON format
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific quote from the database based on the provided ID
    const quote = await tables.quote.read(req.params.id);

    // If the quote is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the quote in JSON format
    if (quote == null) {
      res.sendStatus(404);
    } else {
      res.json(quote);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the quote data from the request body
  const quote = req.body;

  try {
    // Insert the quote into the database
    const insertId = await tables.quote.create(quote);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted quote
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
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
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  destroy,
};
