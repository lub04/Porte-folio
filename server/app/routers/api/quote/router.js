const express = require("express");

const router = express.Router();

const { browse, add, destroy } = require("../../../controllers/quoteActions");
const { checkUser } = require("../../../services/verification/cookies");

router.get("/", browse);

router.post("/", checkUser, add);

router.delete("/:id", checkUser, destroy);

module.exports = router;
