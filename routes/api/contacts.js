const express = require("express");

const router = express.Router();

const { validationBody, isValidContactId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const ctrls = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

// Routes

router.get("/", ctrlWrapper(ctrls.listContacts));

router.get("/:contactId", isValidContactId, ctrlWrapper(ctrls.getContactById));

router.post(
  "/",
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrls.addContact)
);

router.put(
  "/:contactId",
  isValidContactId,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrls.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidContactId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrls.updateStatusContact)
);

router.delete(
  "/:contactId",
  isValidContactId,
  ctrlWrapper(ctrls.removeContact)
);

module.exports = router;
