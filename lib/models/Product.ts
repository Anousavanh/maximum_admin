import mongoose, { Schema, Document, Model } from 'mongoose';

interface ProductDocument extends Document {
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: string[];
  tags: string[];
  price: number;
  cost: number;
  sizes: string[];
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [String], required: true },
  category: { type: String, required: true },
  collections: { type: [String], required: true },
  tags: { type: [String], required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  sizes: { type: [String], required: true },
  colors: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product: Model<ProductDocument> = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;
