const {Router} = require("express");
const { addMessage, getAllMessages } = require("../Controller/messageController");

const messageRouter = Router();

messageRouter.post("/addmsg/", addMessage);

messageRouter.post("/getmsg", getAllMessages);


module.exports = messageRouter;