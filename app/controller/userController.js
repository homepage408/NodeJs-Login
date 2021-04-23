const { baseResponse } = require("./../common/helper/baseResponse");
const { user } = require("./../db/models");
const { hashing } = require("./../common/helper/hashPassword");

class UserController {
  static async findAllUser(req, res, next) {
    try {
      return await user.findAll().then((allUsers) =>
        baseResponse({
          success: true,
          message: `success`,
          data: allUsers.map((user) => {
            return {
              id: user.id,
              fullname: user.fullname,
              username: user.username,
              email: user.email,
              role: user.role,
            };
          }),
        })(res, 200)
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const dataUser = await user.findOne({
        where: {
          username: req.body.username,
        },
      });

      const dataEmail = await user.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (dataUser) {
        return baseResponse({
          success: false,
          message: "username must be unique",
        })(res, 400);
      } else if (dataEmail) {
        return baseResponse({
          success: false,
          message: "email must be unique",
        })(res, 400);
      }
      const { salt, hash } = hashing(req.body.password);
      const data = await user.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
        role: req.body.role,
      });
      return baseResponse({
        success: true,
        message: `success create new user ${req.body.role}`,
        data: {
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          role: data.role,
        },
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { salt, hash } = hashing(req.body.password);
      const payload = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salted: salt,
        role: req.body.role,
      };
      const data = await user.update(payload, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      return baseResponse({ success: true, message: "success", data: data[1] })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error.errors[0].message);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      return await user
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then((rowDestroy) =>
          rowDestroy
            ? baseResponse({ success: true, message: "success delete" })(
                res,
                200
              )
            : baseResponse({ success: false, message: "Data sudah di hapus" })(
                res,
                404
              )
        )
        .catch(console.error);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = UserController;
