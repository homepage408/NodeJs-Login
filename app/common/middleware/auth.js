const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: 60 * 60 * 24,
  });
  return token;
};

const verifyToken = (tokenInput) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const token = tokenInput.split(" ")[1];
      const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = { ...payload };
      next();
    } else {
      res.json({
        message: "token is missing",
      });
    }
  } catch (err) {
    res.status(500);
    next(err);
  }
};

const permit = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403);
      throw new Error(`You don't have permission to access / on this server`);
    }
  };
};

module.exports = {
  generateJWT,
  verifyToken,
  permit,
};
