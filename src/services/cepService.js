async function consultarCep(cep) {
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!resposta.ok) {
    throw new Error("Erro ao consultar o serviço ViaCEP.");
  }

  const dados = await resposta.json();

  return dados;
}

module.exports = {
  consultarCep
};