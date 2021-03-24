const mongoose = require("mongoose");

const LabSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true, enum: ["ativo", "inativo"] },
});

const LabModel = mongoose.model("Labs", LabSchema);

module.exports = LabModel;
