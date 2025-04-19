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
  destroy,
} = require("../../../controllers/messageActions");
const validateMessage = require("../../../services/validateMessage");
const { checkCookie } = require("../../../services/verification/cookies");

// Route to get a list of messages
router.get("/", checkCookie, browse);

// Route to get a specific message by ID
router.get("/:id", checkCookie, read);

// Route to add a new message
router.post("/", validateMessage, add);

router.put("/:id", checkCookie, edit);

router.delete("/:id", checkCookie, destroy);

/* ************************************************************************* */

module.exports = router;
