const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoutes");
const messageRouter = require("./Routes/messageRoute");
const socket = require("socket.io");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DataBase is Connected');
}).catch((err) => {
    console.log(err.message)
});

const server = app.listen(PORT, () => {
    console.log("Connection Successful");
});

const io = socket(server, {
    cors: {
        origin : "*",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        // console.log("sendmsg", {data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
})