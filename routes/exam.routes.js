const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Exam = require("../models/Exam.model");

// Crud - Create (Rota para criar novo exame)
router.post("/exam", body("name").trim().escape(), async (req, res) => {
  try {
    const newExam = await Exam.create(req.body);

    console.log(newExam);

    return res.status(201).json(newExam);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// cRud - Read
// Rota para listar todos os exames
router.get("/exam", async (req, res) => {
  try {
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
    const exam = await Exam.findOne({ _id: req.params.id }).populate("Lab");
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
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
