const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");
const isValidContactId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = RequestError(400, `${contactId} is not corrent id format`);
    next(error);
  }
  next();
};
module.exports = isValidContactId;
