const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import homePage-related actions
const { read, edit } = require("../../../controllers/homePageActions");

// Route to get a specific homePage by ID
router.get("/:id", read);

router.put("/:id", edit);
/* ************************************************************************* */

module.exports = router;
