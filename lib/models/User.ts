import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  wishlist: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);

export default User;
