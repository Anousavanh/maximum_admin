import mongoose, { Schema, model, models } from "mongoose";

const ResponderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    collections: {
      type: [String],
      required: true,
    },
    product: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

const Responder = models.Responder || model("Responder", ResponderSchema);

export default Responder;
