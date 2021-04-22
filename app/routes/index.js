const express = require("express");
const router = express.Router();
const { router: routerLogin } = require("./auth");
const { router: routerUser } = require("./user");

router.use("/auth", [routerLogin,routerUser]);

module.exports = { router };
