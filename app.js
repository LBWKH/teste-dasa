require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configurar o app Express para entender requisições com conteúdo JSON
app.use(express.json());

// Configurar o app para entender requisições do tipo URLEncoded para envio de imagens
app.use(bodyParser.urlencoded({ extended: false }));

// Importar roteadores
const router = require("./routes/index.routes");
app.use("/", router);

// Importar a configuração do banco de dados (mongoose)

// Subir o servidor web para escutar requisições
app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
