const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import homePage-related actions
const { browse, read, add } = require("../../../controllers/homePageActions");

// Route to get a list of homePages
router.get("/", browse);

// Route to get a specific homePage by ID
router.get("/:id", read);

// Route to add a new homePage
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
