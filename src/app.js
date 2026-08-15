const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Help Med CEP funcionando."
  });
});

module.exports = app;