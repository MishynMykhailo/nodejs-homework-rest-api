const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  console.log("USER-USER-USER", req.user);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = addContact;
