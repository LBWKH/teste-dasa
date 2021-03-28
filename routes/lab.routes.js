const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Lab = require("../models/Lab.model");

// Crud - Create (Rota para criar novo laboratório)
router.post(
  "/lab",
  body("name").trim().escape(),
  body("exams").escape(),
  async (req, res) => {
    try {
      const newLab = await Lab.create(req.body);
      console.log(newLab);

      return res.status(201).json(newLab);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud - Read
// (Rota para listar todos os laboratórios)
router.get("/lab", async (req, res) => {
  try {
    const labs = await Lab.find({ status: "ativo" });
    console.log(labs);

    return res.status(200).json(labs);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Rota para listar detalhes de um laboratório individual
router.get("/lab/:id", async (req, res) => {
  try {
    const lab = await Lab.findOne({ _id: req.params.id }).populate("Exam");
    console.log(lab);

    if (!lab) {
      return res.status(404).json({ msg: "Laboratório não encontrado" });
    }
    return res.status(200).json(lab);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// crUd - Update (Rota para atualizar o laboratório)
router.patch("/lab/:id", async (req, res) => {
  try {
    const updatedLab = await Lab.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedLab) {
      return res.status(404).json({ msg: "Laboratório não encontrado" });
    }

    return res.status(200).json(updatedLab);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// cruD - Delete (Apaga o laboratório)
router.delete("/lab/:id", async (req, res) => {
  try {
    const deleted = await Lab.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Laboratório não enontrado" });
    }

    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
