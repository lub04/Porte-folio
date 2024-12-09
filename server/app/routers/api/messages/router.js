const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import message-related actions
const { browse, read, add } = require("../../../controllers/messageActions");

// Route to get a list of messages
router.get("/", browse);

// Route to get a specific message by ID
router.get("/:id", read);

// Route to add a new message
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
