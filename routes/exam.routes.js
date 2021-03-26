const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam.model");

// Crud - Create (Rota para criar novo exame)
router.post("/exam", async (req, res) => {
  // Criar o documento no banco usando o Model
  try {
    //   Usa o model pré-definido para criar um novo documento no banco
    const newExam = await Exam.create(req.body);
    // O banco responde com o documento recém-criado
    console.log(newExam);

    // Responde a requisição com o documento recém-criado e o status 201 (Created)
    return res.status(201).json(newExam);
  } catch (err) {
    //   Caso algo dê errado, responde com o status 500 (Internal server error) e o motivo do erro
    return res.status(500).json({ msg: err });
  }
});

// cRud - Read
// Rota para listar todos os exames
router.get("/exam", async (req, res) => {
  try {
    // O .find() sem filtros traz todos os documentos da collection, portanto trazer apenas os que tem status ativos true
    const exams = await Exam.find({ status: "ativo" });
    console.log(exams);

    return res.status(200).json(exams);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Rota para listar detalhes de um exame individual
router.get("/exam/:id", async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id }).populate("labs");
    console.log(exam);

    if (!exam) {
      return res.status(404).json({ msg: "Exame não encontrado" });
    }
    return res.status(200).json(exam);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// crUd - Update (Rota para atualizar o exame)
router.patch("/exam/:id", async (req, res) => {
  try {
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ msg: "Exame não encontrado" });
    }

    return res.status(200).json(updatedExam);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// cruD - Delete (Apaga o exame)
router.delete("/exam/:id", async (req, res) => {
  try {
    const deleted = await Exam.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Exame não enontrado" });
    }
    // Por padrões REST, operações de deleção DEVEM retornar NADA, um objeto vazio.
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
