const express = require("express");
const router = express.Router();

const Lab = require("../models/Lab.model");

// Crud - Create (Rota para criar novo laboratório)
router.post("/lab", async (req, res) => {
  // Criar o documento no banco usando o Model
  try {
    //   Usa o model pré-definido para criar um novo documento no banco
    const newLab = await Lab.create(req.body);
    // O banco responde com o documento recém-criado
    console.log(newLab);

    // Responde a requisição com o documento recém-criado e o status 201 (Created)
    return res.status(201).json(newLab);
  } catch (err) {
    //   Caso algo dê errado, responde com o status 500 (Internal server error) e o motivo do erro
    return res.status(500).json({ msg: err });
  }
});

// cRud - Read
// (Rota para listar todos os laboratórios)
router.get("/lab", async (req, res) => {
  try {
    // O .find() sem filtros traz todos os documentos da collection, portanto trazer apenas os que tem status ativos true
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
    // Por padrões REST, operações de deleção DEVEM retornar NADA, um objeto vazio.
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
