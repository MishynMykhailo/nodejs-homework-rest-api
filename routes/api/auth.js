const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { authControllers } = require("../../controllers");

const router = express.Router();

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

// signup
router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(authControllers.register)
);

// singin
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(authControllers.login)
);

router.get("/logout", authenticate, ctrlWrapper(authControllers.logout));

router.patch(
  "/",
  authenticate,
  validationBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(authControllers.updateSubscriptionUser)
);
module.exports = router;
