import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media1: [String],
  media2: [String],
  sizes: String,
  colors: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const ProductScreen = mongoose.models.ProductScreen || mongoose.model("ProductScreen", ProductSchema);

export default ProductScreen;