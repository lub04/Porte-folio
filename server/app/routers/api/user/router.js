const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const { browse, read, edit } = require("../../../controllers/userActions");
const upload = require("../../../services/upload");
const { login, logout } = require("../../../controllers/authActions");
// Route to get a list of users
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.put("/:id", upload.single("CV"), edit);

router.post("/login", login);
router.post("/logout", logout);
/* ************************************************************************* */

module.exports = router;
