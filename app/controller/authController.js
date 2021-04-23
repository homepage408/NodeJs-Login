const { baseResponse } = require("./../common/helper/baseResponse");
const { user } = require("./../db/models");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("./../common/middleware/auth");

class AuthController {
  static async login(req, res, next) {
    try {
      const data = await user.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (data) {
        const check = bcrypt.compareSync(req.body.password, data.password);
        if (check) {
          const payload = {
            id: data.id,
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            role: data.role,
          };
          payload.token = generateJWT(payload);
          return baseResponse({
            success: true,
            message: "login success",
            data: { ...payload },
          })(res, 200);
        } else {
          return baseResponse({ success: false, message: "password error" })(
            res,
            400
          );
        }
      } else {
        return baseResponse({ success: false, message: "email error" })(
          res,
          400
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = AuthController;
