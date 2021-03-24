const mongoose = require("mongoose");

// Criar conexão com banco
// Tem que ser assíncrono para o interpretador não ficar esperando a resposta
function initializeDb() {
  mongoose
    .connect(`${process.env.MONGODB_URI}/teste-dasa`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((conn) =>
      console.log(
        `Successfully connected to the DB: ${conn.connections[0].name}`
      )
    )
    .catch((err) =>
      console.error(`Failed to connect to the DB, details: `, err)
    );
}

module.exports = initializeDb;
