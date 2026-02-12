const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // receive message from client
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);

  
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
//socket.emit("chat message", "Hello");
// send hello to whoever listening to chat message event
