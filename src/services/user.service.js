const bcrypt = require("bcryptjs");

const { User } = require("../models");

const {
  generateUUID,
} = require("../utils/uuid.util");

class UserService {
  /**
   * Create User
   */
  async createUser(payload) {
    const {
      email,
      password,
      defaultCurrency,
    } = payload;

    const existingUser =
      await User.findOne({
        where: {
          email,
        },
      });

    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        id: generateUUID(),
        email,
        passwordHash,
        defaultCurrency,
      });

    return {
      id: user.id,
      email: user.email,
      defaultCurrency:
        user.defaultCurrency,
      createdAt: user.createdAt,
    };
  }

  /**
   * Get User By Id
   */
  async getUserById(userId) {
    const user =
      await User.findOne({
        where: {
          id: userId,
          deletedAt: null,
        },
        attributes: {
          exclude: [
            "passwordHash",
          ],
        },
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    return user;
  }

  /**
   * Update User
   */
  async updateUser(
    userId,
    payload
  ) {
    const user =
      await User.findOne({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (
      payload.email &&
      payload.email !== user.email
    ) {
      const emailExists =
        await User.findOne({
          where: {
            email:
              payload.email,
          },
        });

      if (emailExists) {
        throw new Error(
          "Email already exists"
        );
      }
    }

    await user.update({
      email:
        payload.email ??
        user.email,

      defaultCurrency:
        payload.defaultCurrency ??
        user.defaultCurrency,
    });

    return {
      id: user.id,
      email: user.email,
      defaultCurrency:
        user.defaultCurrency,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Soft Delete User
   */
  async deleteUser(userId) {
    const user =
      await User.findOne({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    await user.update({
      deletedAt: new Date(),
    });

    return {
      message:
        "User deleted successfully",
    };
  }
}

module.exports =
  new UserService();