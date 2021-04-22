const bycript = require("bcryptjs");
const saltRounds = 10;

const hashing = (password) => {
  const salt = bycript.genSaltSync(saltRounds);
  const hash = bycript.hashSync(password, salt);
  return {
    salt,
    hash,
  };
};

module.exports = { hashing };
