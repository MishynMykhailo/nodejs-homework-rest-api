const express = require("express");

const router = express.Router();

const {
  authenticate,
  validationBody,
  isValidContactId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { contactsControllers } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

// Routes

router.get("/", authenticate, ctrlWrapper(contactsControllers.listContacts));

router.get(
  "/:contactId",
  isValidContactId,
  ctrlWrapper(contactsControllers.getContactById)
);

router.post(
  "/",
  authenticate,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(contactsControllers.addContact)
);

router.put(
  "/:contactId",
  isValidContactId,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(contactsControllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidContactId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(contactsControllers.updateStatusContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidContactId,
  ctrlWrapper(contactsControllers.removeContact)
);

module.exports = router;
