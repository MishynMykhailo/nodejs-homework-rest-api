const { Contact } = require("../../models/contact");
// Поля записанные через "-" не передадутся при запросе
const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updateAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(result);
};

module.exports = listContacts;
