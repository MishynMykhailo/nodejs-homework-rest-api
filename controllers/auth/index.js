const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatarUser = require("./updateAvatarUser");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
module.exports = {
  register,
  login,
  logout,
  updateSubscriptionUser,
  updateAvatarUser,
  verifyEmail,
  resendVerifyEmail,
};
