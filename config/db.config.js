const mongoose = require("mongoose");

// Criar conexão com banco
// Tem que ser assíncrono para o interpretador não ficar esperando a resposta
mongoose
  .connect("mongodb://localhost:27017/teste-dasa", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((conn) =>
    console.log(`Successfully connected to the DB: ${conn.connections[0].name}`)
  )
  .catch((err) => console.error(`Failed to connect to the DB, details: `, err));
