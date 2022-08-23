const { Contact } = require("../../models/contact");
// Поля записанные через "-" не передадутся при запросе
const listContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updateAt");
  res.json(result);
};

module.exports = listContacts;
