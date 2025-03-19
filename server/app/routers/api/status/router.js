const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import status-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/statusActions");
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of status
router.get("/", checkUser, browse);

// Route to get a specific status by ID
router.get("/:id", checkUser, read);

// Route to add a new status
router.post("/", checkUser, add);

// Route to delete a status
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
