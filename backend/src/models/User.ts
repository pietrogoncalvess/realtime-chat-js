import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: {
    type: String,
    select: false,
  },
});

export const User = model("User", UserSchema);
