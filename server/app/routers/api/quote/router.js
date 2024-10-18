const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import quote-related actions
const { browse, read, add } = require("../../../controllers/quoteActions");

// Route to get a list of quotes
router.get("/", browse);

// Route to get a specific quote by ID
router.get("/:id", read);

// Route to add a new quote
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
