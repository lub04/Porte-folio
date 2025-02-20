const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

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

const userRouter = require("./user/rooter");

router.use("/user", userRouter);

const categoryRouter = require("./category/rooter");

router.use("/category", categoryRouter);

const imageRouter = require("./image/rooter");

router.use("/image", imageRouter);
/* ************************************************************************* */

module.exports = router;
