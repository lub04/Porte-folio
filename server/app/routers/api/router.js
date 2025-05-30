const express = require("express");

const router = express.Router();

const { optionalAuth } = require("../../services/verification/cookies");

router.use(optionalAuth);

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const projectsRouter = require("./projects/router");

router.use("/projects", projectsRouter);

const homeRouter = require("./home/router");

router.use("/home", homeRouter);

const quoteRouter = require("./quote/router");

router.use("/quote", quoteRouter);

const messagesRouter = require("./messages/router");

router.use("/messages", messagesRouter);

const userRouter = require("./user/router");

router.use("/user", userRouter);

const categoryRouter = require("./category/router");

router.use("/category", categoryRouter);

const imageRouter = require("./image/router");

router.use("/image", imageRouter);

const projectSkillRouter = require("./projectSkill/router");

router.use("/projectSkill", projectSkillRouter);

const skillRouter = require("./skill/router");

router.use("/skill", skillRouter);

const statusRouter = require("./status/router");

router.use("/status", statusRouter);

const skillCategoryRouter = require("./skillCategory/router");

router.use("/skillCategory", skillCategoryRouter);

module.exports = router;
