const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  //   const comparePassword = await user.validatePassword(password);
  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }
  const token = "123sa.sadasdas.asdsad";
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
