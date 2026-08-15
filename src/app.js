const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Help Med CEP funcionando."
  });
});

app.get("/api/cep/:cep", (req, res) => {
  const cep = req.params.cep;

  res.json({
    mensagem: "CEP recebido com sucesso.",
    cep: cep
  });
});

module.exports = app;