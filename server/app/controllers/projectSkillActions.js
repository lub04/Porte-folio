// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all projectSkills from the database
    const projectSkills = await tables.project_skill.readAll();

    // Respond with the projectSkills in JSON format
    res.json(projectSkills);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific projectSkill from the database based on the provided ID
    const projectSkill = await tables.project_skill.read(req.params.id);

    // If the projectSkill is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the projectSkill in JSON format
    if (projectSkill == null) {
      res.sendStatus(404);
    } else {
      res.json(projectSkill);
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
  // Extract the projectSkill data from the request body
  const projectSkill = req.body;

  try {
    // Insert the projectSkill into the database
    const insertId = await tables.project_skill.create(projectSkill);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted projectSkill
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    await tables.project_skill.delete({
      project_id: req.params.project_id,
      skill_id: req.params.skill_id,
    });

    res.sendStatus(204);
  } catch (err) {
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
  destroy,
};
