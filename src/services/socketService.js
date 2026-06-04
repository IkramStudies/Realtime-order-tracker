const socketIo = require("socket.io");

const initSocket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  });

  return io;
};

module.exports = { initSocket };
