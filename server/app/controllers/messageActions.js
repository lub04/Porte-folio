// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all messages from the database
    const messages = await tables.message.readAll();

    // Respond with the messages in JSON format
    res.json(messages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific message from the database based on the provided ID
    const message = await tables.message.read(req.params.id);

    // If the message is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the message in JSON format
    if (message == null) {
      res.sendStatus(404);
    } else {
      res.json(message);
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
  // Extract the message data from the request body
  const message = req.body;

  try {
    // Insert the message into the database
    const insertId = await tables.message.create(message);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted message
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  // Extract the message data from the request body and params
  const message = { ...req.body, id: req.params.id };

  try {
    // Update the message in the database
    await tables.message.updateMessageStatus(message);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.message.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
