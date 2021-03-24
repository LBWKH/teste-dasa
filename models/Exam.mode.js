const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Análise clínica", "Imagem"] },
  status: { type: String, required: true, enum: ["ativo", "inativo"] },
});

const ExamModel = mongoose.model("Exams", ExamSchema);

module.exports = ExamModel;
