const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  destroy,
  edit,
} = require("../../../controllers/projectActions");
const validateProject = require("../../../services/validateProject");
const { checkUser } = require("../../../services/verification/cookies");

router.get("/", browse);

router.get("/:id", read);

router.post("/", validateProject, checkUser, add);

router.delete("/:id", checkUser, destroy);

router.put("/:id", validateProject, checkUser, edit);

module.exports = router;
