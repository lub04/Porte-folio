const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import status-related actions
const { browse, read, add } = require("../../../controllers/statusActions");

// Route to get a list of status
router.get("/", browse);

// Route to get a specific status by ID
router.get("/:id", read);

// Route to add a new status
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
