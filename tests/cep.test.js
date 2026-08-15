const request = require("supertest");
const app = require("../src/app");

describe("API Help Med CEP", () => {

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

  test("deve rejeitar CEP com letras", async () => {
    const resposta = await request(app).get("/api/cep/ABCDEFGH");

    expect(resposta.statusCode).toBe(400);

    expect(resposta.body).toEqual({
      erro: "CEP deve possuir 8 dígitos."
    });
  });

});