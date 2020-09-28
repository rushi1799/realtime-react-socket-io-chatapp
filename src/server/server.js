var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const getVisitors = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map((s) => s.user);
  return users.filter((u) => u !== undefined);
};

const emitVisitors = () => {
  io.emit("visitors", getVisitors());
};

io.on("connection", (socket) => {
  console.log("a user connected");

  const emitOnlineUsers = () => {
    socket.broadcast.emit("users", getVisitors());
  };

  socket.on("new_visitor", (user) => {
    socket.user = user;
    emitVisitors();
  });

  socket.on("disconnect", () => {
    emitVisitors();
    const { user } = socket;

    if (user) {
      socket.broadcast.emit("server_message", {
        name: "App",
        message: `${user.name} just left chat`,
      });
      emitOnlineUsers();
    }
  });

  // room chat
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("message", ({ room, message }) => {
    socket.to(room).emit("message", {
      message,
      name: "friend",
    });
  });
  socket.on("typing", ({ room }) => {
    socket.to(room).emit("typing", "Someone is typing...");
  });
  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("stop_typing");
  });

  // add user to socket
  socket.on("add_user", (user) => {
    socket.emit("server_message", {
      name: "App",
      message: "Welcome to room",
    });
    socket.broadcast.emit("server_message", {
      name: "App",
      message: `${user.name} just joined chat`,
    });
    socket.user = user;
    emitOnlineUsers();
  });
});
const port = 3000;

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
