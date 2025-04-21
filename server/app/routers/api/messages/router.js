const express = require("express");

const router = express.Router();

const {
  browse,
  add,
  edit,
  destroy,
} = require("../../../controllers/messageActions");
const validateMessage = require("../../../services/validateMessage");
const { checkCookie } = require("../../../services/verification/cookies");

router.get("/", checkCookie, browse);

router.post("/", validateMessage, add);

router.put("/:id", checkCookie, edit);

router.delete("/:id", checkCookie, destroy);

module.exports = router;
