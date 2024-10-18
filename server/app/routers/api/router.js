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
/* ************************************************************************* */

module.exports = router;
