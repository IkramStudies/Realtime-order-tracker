const socketIo = require("socket.io");

const initSocket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Optional: Implement 'Rooms' here for privacy
    // socket.join('some_room_id');
  });

  return io;
};

module.exports = { initSocket };
