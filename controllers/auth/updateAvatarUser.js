const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const updateAvatarUser = async (req, res) => {
  try {
    const { path: tmpUpload, filename } = req.file;

    await Jimp.read(tmpUpload)
      .then((photo) => {
        return photo.resize(250, 250).write(tmpUpload);
      })
      .catch((err) => {
        console.log(err);
      });

    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;

    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join(resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatarUser;
