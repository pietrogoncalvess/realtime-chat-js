import { Schema, model } from "mongoose";

const UserStatusSchema = new Schema({
  userId: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const UserStatus = model("UserStatus", UserStatusSchema);
