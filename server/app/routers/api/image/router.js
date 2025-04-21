const express = require("express");

const router = express.Router();

const {
  browse,
  add,
  edit,
  destroy,
} = require("../../../controllers/imageActions");
const upload = require("../../../services/upload");
const { checkUser } = require("../../../services/verification/cookies");

router.get("/", checkUser, browse);

router.post("/", upload.single("image"), checkUser, add);

router.put("/:id", upload.single("image"), checkUser, edit);

router.delete("/:id", checkUser, destroy);

module.exports = router;
