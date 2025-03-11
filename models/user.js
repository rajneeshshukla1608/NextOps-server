import mongoose from "mongoose";

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true, 
    unique: false,
  },
  last_name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("aiops_users", schema);
