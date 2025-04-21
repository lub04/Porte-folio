const express = require("express");

const router = express.Router();

const { read, edit } = require("../../../controllers/userActions");
const upload = require("../../../services/upload");
const { login, logout } = require("../../../controllers/authActions");

router.get("/:id", read);

router.put("/:id", upload.single("CV"), edit);

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
