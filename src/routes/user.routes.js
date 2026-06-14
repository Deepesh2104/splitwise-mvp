const router = require("express").Router();

const userController = require("../controllers/user.controller");

const validate = require("../middlewares/validation.middleware");

const {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} = require("../validators/user.validator");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: deepesh@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               defaultCurrency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  "/",
  validate(createUserSchema),
  userController.createUser
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User By Id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  validate(userIdParamSchema, "params"),
  userController.getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated@gmail.com
 *               defaultCurrency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  validate(userIdParamSchema, "params"),
  validate(updateUserSchema),
  userController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  validate(userIdParamSchema, "params"),
  userController.deleteUser
);

module.exports = router;