const mongoose = require("mongoose");
const uniqid = require("uniqid");

const nameSchema = new mongoose.Schema({
  id: { type: String, default: uniqid(undefined, "-user") },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  admin: { type: Boolean, default: false },
  bookings: { type: Array, default: [] },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", nameSchema);
module.exports = User;
