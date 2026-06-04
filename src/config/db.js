const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

const watchOrders = (callback) => {
  const Order = require("../models/order");
  // This is the "Magic" - MongoDB Change Stream
  const changeStream = Order.watch();

  changeStream.on("change", (change) => {
    // Pass the change event back to the socket service
    callback(change);
  });
};

module.exports = { connectDB, watchOrders };
