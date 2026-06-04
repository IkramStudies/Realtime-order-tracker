require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const { connectDB, watchOrders } = require("./config/db");
const { initSocket } = require("./services/socketService");

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// 1. Serve static files from the 'src/public' directory
app.use(express.static(path.join(__dirname, "public")));

// 2. Explicit route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// 3. Connect to DB and start watching for changes
connectDB()
  .then(() => {
    console.log("MongoDB Connected. Starting Change Stream...");

    watchOrders((change) => {
      console.log("Change detected in DB, broadcasting to clients...");
      // Broadcast the change to all connected clients via Socket.io
      io.emit("order_update", change);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000"),
);
