const joi = require("joi");

const createUserSchema = joi.object({
  fullname: joi.string().required(),
  username: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required(),
});

module.exports = {
  createUserSchema,
};
