const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import message-related actions
const {
  browse,
  read,
  add,
  edit,
} = require("../../../controllers/messageActions");
const validateMessage = require("../../../services/validateMessage");

// Route to get a list of messages
router.get("/", browse);

// Route to get a specific message by ID
router.get("/:id", read);

// Route to add a new message
router.post("/", validateMessage, add);

router.put("/:id", edit);
/* ************************************************************************* */

module.exports = router;
