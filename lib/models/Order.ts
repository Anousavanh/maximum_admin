import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
  total: Number,
  form: {
    name: String,
    surname: String,
    city: String,
    home: String,
    phone: String,
    media: [String], // Assuming media is an array of strings
  },
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
