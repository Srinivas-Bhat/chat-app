const {Router} = require("express");
const { signup, login, setAvatar, getAllUsers } = require("../Controller/userController");

const userRouter = Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/setAvatar/:id", setAvatar);

userRouter.get("/allusers/:id", getAllUsers)

module.exports = userRouter;