// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all skills from the database
    const skills = await tables.skill.readAll();

    // Respond with the skills in JSON format
    res.json(skills);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific skill from the database based on the provided ID
    const skill = await tables.skill.read(req.params.id);

    // If the skill is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the skill in JSON format
    if (skill == null) {
      res.sendStatus(404);
    } else {
      res.json(skill);
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
  // Extract the skill data from the request body
  const skill = req.body;

  try {
    // Insert the skill into the database
    const insertId = await tables.skill.create(skill);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted skill
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
