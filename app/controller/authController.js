const { baseResponse } = require("./../common/helper/baseResponse");
const { user } = require("./../db/models");
const bycript = require("bcryptjs");
const { generateJWT } = require("./../common/middleware/auth");

class AuthController {
  static async login(req, res, next) {
    try {
        const data = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        console.log(data);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = AuthController;