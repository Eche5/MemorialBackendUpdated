const express = require("express");
const authControlller = require("../Controller/authController");
const userController = require("../Controller/userController");

const router = express.Router();

router
  .route("/tribute")
  .post(userController.createTribute)
  .get(userController.getAllTributes);

router.route("/:id").get(userController.getOneTribute);
router.route("/tribute/:id").patch(userController.editTributes);
router.route("/register").post(authControlller.Register);
router.route("/login").post(authControlller.login);
router.route("/tribute").delete(userController.deleteTribute);

module.exports = router;
