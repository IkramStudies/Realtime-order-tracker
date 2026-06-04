const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: String,
  product_name: String,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
