const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
