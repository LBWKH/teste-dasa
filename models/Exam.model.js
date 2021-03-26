const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Análise clínica", "Imagem"] },
  status: { type: String, required: true, enum: ["ativo", "inativo"] },
  labs: [{ type: Schema.Types.ObjectId, ref: "Lab" }],
});

const ExamModel = mongoose.model("Exams", ExamSchema);

module.exports = ExamModel;
