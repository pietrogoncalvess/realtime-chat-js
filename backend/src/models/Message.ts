import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  from: String,
  to: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export const Message = model("Message", MessageSchema);
