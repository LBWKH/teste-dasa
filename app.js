require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configurar o app Express para entender requisições com conteúdo JSON
app.use(express.json());

// Configurar o app para entender requisições do tipo URLEncoded para envio de imagens
app.use(bodyParser.urlencoded({ extended: false }));

// Importar a configuração do banco de dados (mongoose)
const db = require("./config/db.config");
db();

// Importar roteadores
const router = require("./routes/index.routes");
app.use("/", router);

const routerLab = require("./routes/lab.routes");
app.use("/", routerLab);

const routerExam = require("./routes/exam.routes");
app.use("/", routerExam);

// Subir o servidor web para escutar requisições
app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);