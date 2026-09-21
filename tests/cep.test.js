const request = require("supertest");
const app = require("../src/app");

describe("API Help Med CEP", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("deve retornar mensagem de funcionamento na rota principal", async () => {
    const resposta = await request(app).get("/");

    expect(resposta.statusCode).toBe(200);

    expect(resposta.body).toEqual({
      mensagem: "API Help Med CEP funcionando."
    });
  });

  test("deve rejeitar CEP com menos de 8 digitos", async () => {
    const resposta = await request(app).get("/api/cep/123");

    expect(resposta.statusCode).toBe(400);

    expect(resposta.body).toEqual({
      erro: "CEP deve possuir 8 dígitos."
    });
  });

  test("deve rejeitar CEP contendo letras", async () => {
    const resposta = await request(app).get("/api/cep/ABCDEFGH");

    expect(resposta.statusCode).toBe(400);

    expect(resposta.body).toEqual({
      erro: "CEP deve possuir 8 dígitos."
    });
  });

  test("deve retornar os dados de um CEP valido", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        cep: "01001-000",
        logradouro: "Praça da Sé",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP"
      })
    });

    const resposta = await request(app).get("/api/cep/01001000");

    expect(resposta.statusCode).toBe(200);

    expect(resposta.body).toEqual({
      cep: "01001-000",
      logradouro: "Praça da Sé",
      bairro: "Sé",
      cidade: "São Paulo",
      uf: "SP"
    });
  });

  test("deve retornar erro 404 quando o CEP nao existir", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        erro: true
      })
    });

    const resposta = await request(app).get("/api/cep/99999999");

    expect(resposta.statusCode).toBe(404);

    expect(resposta.body).toEqual({
      erro: "CEP não encontrado."
    });
  });

  test("deve retornar erro 500 quando o servico externo falhar", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false
    });

    const resposta = await request(app).get("/api/cep/01001000");

    expect(resposta.statusCode).toBe(500);

    expect(resposta.body).toEqual({
      erro: "Não foi possível consultar o CEP."
    });
  });

});