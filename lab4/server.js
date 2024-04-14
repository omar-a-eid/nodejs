import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT);
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
