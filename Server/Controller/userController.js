const UserModel = require("../Models/userModel");
const brcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await UserModel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "UserName already taken", status: false });
    }
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already taken", status: false });
    }
    const hashedPassword = await brcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const checkPasswordValid = await brcrypt.compare(password, user.password);
    if (!checkPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};


module.exports.getAllUsers = async (req, res, next) => {
  try{
    const users = await UserModel.find({_id: { $ne: req.params.id }}).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  }
  catch(err) {
    console.log(err);
  }
}
