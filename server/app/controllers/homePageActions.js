// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all homePages from the database
    const homePages = await tables.homePage.readAll();

    // Respond with the homePages in JSON format
    res.json(homePages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific homePage from the database based on the provided ID
    const homePage = await tables.homePage.read(req.params.id);

    // If the homePage is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the homePage in JSON format
    if (homePage == null) {
      res.sendStatus(404);
    } else {
      res.json(homePage);
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
  // Extract the homePage data from the request body
  const homePage = req.body;

  try {
    // Insert the homePage into the database
    const insertId = await tables.homePage.create(homePage);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted homePage
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
