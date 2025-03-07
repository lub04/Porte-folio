// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all status from the database
    const status = await tables.status.readAll();

    // Respond with the status in JSON format
    res.json(status);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific statu from the database based on the provided ID
    const status = await tables.status.read(req.params.id);

    // If the statu is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the statu in JSON format
    if (status == null) {
      res.sendStatus(404);
    } else {
      res.json(status);
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
  // Extract the statu data from the request body
  const status = req.body;

  try {
    // Insert the statu into the database
    const insertId = await tables.statu.create(status);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted statu
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
