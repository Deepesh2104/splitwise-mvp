const userService = require("../services/user.service");

const {
  success,
  error,
} = require("../utils/api-response");

class UserController {
  /**
   * Create User
   */
  async createUser(req, res) {
    try {
      const user =
        await userService.createUser(
          req.body
        );

      return success(
        res,
        user,
        "User created successfully",
        201
      );
    } catch (err) {
      return error(
        res,
        err.message,
        400
      );
    }
  }

  /**
   * Get User
   */
  async getUserById(req, res) {
    try {
      const user =
        await userService.getUserById(
          req.params.id
        );

      return success(
        res,
        user,
        "User fetched successfully"
      );
    } catch (err) {
      return error(
        res,
        err.message,
        404
      );
    }
  }

  /**
   * Update User
   */
  async updateUser(req, res) {
    try {
      const user =
        await userService.updateUser(
          req.params.id,
          req.body
        );

      return success(
        res,
        user,
        "User updated successfully"
      );
    } catch (err) {
      return error(
        res,
        err.message,
        400
      );
    }
  }

  /**
   * Delete User
   */
  async deleteUser(req, res) {
    try {
      const result =
        await userService.deleteUser(
          req.params.id
        );

      return success(
        res,
        result,
        "User deleted successfully"
      );
    } catch (err) {
      return error(
        res,
        err.message,
        404
      );
    }
  }
}

module.exports =
  new UserController();