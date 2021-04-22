const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const { createUserSchema } = require("../common/helper/userInput");
const { validation } = require("../common/middleware/validationUserInput");

router
  .route("/user")
  .post(validation(createUserSchema), UserController.createUser)
  .get(UserController.findAllUser);

router
  .route("/user/:id")
  .delete(UserController.deleteUser)
  .put(UserController.updateUser);

module.exports = { router };
