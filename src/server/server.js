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
  return users;
};

const emitVisitors = () => {
  io.emit("visitors", getVisitors());
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new_visitor", (user) => {
    console.log(`New visitor `, user);
    socket.user = user;
    emitVisitors();
  });

  socket.on("disconnect", () => {
    emitVisitors();
    console.log(`user disconnected`);
  });
});
const port = 3000;

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
