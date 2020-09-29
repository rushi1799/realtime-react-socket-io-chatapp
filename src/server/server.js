var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const rooms = ["java"];
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
        message: `${user} just left chat`,
      });
      emitOnlineUsers();
    }
  });

  //

  // room chat
  // get room users
  const emitRoomUsers = (room) => {
    if (io.sockets.adapter.rooms[room] !== undefined) {
      var clients = io.sockets.adapter.rooms[room].sockets;
      let keys = Object.keys(clients);
      let users = [];
      keys.map((key) => users.push(io.sockets.connected[key].user));
      io.to(room).emit("online", users);
    }
  };
  //send rooms
  const sendRooms = () => {
    io.emit("rooms", rooms);
  };

  //manage rooms
  socket.on("add_room", (room) => {
    rooms.push(room);
    sendRooms();
  });
  socket.on("rooms", () => {
    socket.emit("rooms", rooms);
  });
  //join room
  socket.on("join_room", ({ room, user }) => {
    socket.user = user;
    socket.join(room);
    emitRoomUsers(room);
    socket.emit("server_message", {
      name: "server",
      message: "Welcome to room",
    });
    socket.to(room).broadcast.emit("server_message", {
      name: "server",
      message: `${user} just joined chat`,
    });
    console.log(`${user} join the ${room} room`);
  });

  // leave room

  socket.on("leave_room", ({ room, curuser }) => {
    socket.leave(room);
    socket.to(room).broadcast.emit("server_message", {
      name: "server",
      message: `${curuser} just left the chat`,
    });
    emitRoomUsers(room);
  });
  //server message

  socket.on("message", ({ room, message, user }) => {
    io.to(room).emit("message", {
      message,
      name: user,
    });
  });

  //typing event
  socket.on("typing", ({ room, user }) => {
    socket.to(room).emit("typing", `${user} is typing...`);
  });
  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("stop_typing", "");
  });

  // add user to socket
  // socket.on("add_user", (user) => {
  //   socket.emit("server_message", {
  //     name: "App",
  //     message: "Welcome to room",
  //   });
  //   socket.broadcast.emit("server_message", {
  //     name: "App",
  //     message: `${user.name} just joined chat`,
  //   });
  //   socket.user = user;
  //   emitOnlineUsers();
  // });
});
const port = 3000;

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
