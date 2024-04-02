import express from "express";
import { Server } from "socket.io";

const app = express();
const expressServer = app.listen(3500);
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
