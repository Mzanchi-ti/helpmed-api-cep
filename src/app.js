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

  const cepLimpo = cep.replace("-", "");

  const cepValido = /^\d{8}$/.test(cepLimpo);

  if (!cepValido) {
    return res.status(400).json({
      erro: "CEP deve possuir 8 dígitos."
    });
  }

  try {
    const dados = await consultarCep(cepLimpo);

    if (dados.erro) {
      return res.status(404).json({
        erro: "CEP não encontrado."
      });
    }

    return res.json({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    });
  } catch (erro) {
    return res.status(500).json({
      erro: "Não foi possível consultar o CEP."
    });
  }
});

module.exports = app;