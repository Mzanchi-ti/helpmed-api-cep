const express = require("express");
const { consultarCep } = require("./services/cepService");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Help Med CEP funcionando."
  });
});

app.get("/api/cep/:cep", async (req, res) => {
  const cep = req.params.cep;

  try {
    const dados = await consultarCep(cep);

    res.json({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    });
  } catch (erro) {
    res.status(500).json({
      erro: "Não foi possível consultar o CEP."
    });
  }
});

module.exports = app;