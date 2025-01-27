const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { authControllers } = require("../../controllers");

const router = express.Router();

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

// signup
router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(authControllers.register)
);
// verifyMail
router.get(
  "/verify/:verificationToken",
  ctrlWrapper(authControllers.verifyEmail)
);
router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(authControllers.resendVerifyEmail)
);
// singin
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(authControllers.login)
);
// logout
router.get("/logout", authenticate, ctrlWrapper(authControllers.logout));
// patch subscription
router.patch(
  "/",
  authenticate,
  validationBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(authControllers.updateSubscriptionUser)
);

// patch avatar
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(authControllers.updateAvatarUser)
);

module.exports = router;
