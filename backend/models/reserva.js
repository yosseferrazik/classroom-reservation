const mongoose = require("mongoose");
const uniqid = require("uniqid");

const reserveSchema = new mongoose.Schema({
  reserveId: { type: String, default: uniqid(undefined, "-reservation") },
  reserveName: { type: String, required: true },
  reserveOwnerId: { type: String, required: true },
  reservePublicName: { type: String, required: false, default: "Anònim" },
  reserveClass: { type: String, required: true },
  reserveHours: { type: Array, required: true },
  reserveDay: { type: String, required: true },
  reserveMonth: { type: String, required: true },
  reserveFullDate: { type: Date, required: true },
});

const Reserve = mongoose.model("Reserve", reserveSchema);
module.exports = Reserve;
