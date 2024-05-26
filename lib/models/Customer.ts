import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Add other necessary fields
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
