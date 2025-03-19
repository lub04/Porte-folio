const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import quote-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/quoteActions");

// Route to get a list of quotes
router.get("/", browse);

// Route to get a specific quote by ID
router.get("/:id", read);

// Route to add a new quote
router.post("/", add);

// Route to delete a quote
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
