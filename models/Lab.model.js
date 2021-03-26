const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LabSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true, enum: ["ativo", "inativo"] },
  exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
});

const LabModel = mongoose.model("Labs", LabSchema);

module.exports = LabModel;
