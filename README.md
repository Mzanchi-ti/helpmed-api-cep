# HelpMed API CEP

API REST desenvolvida para consulta de CEP e preenchimento automático de dados de endereço no sistema Help Med CWB.

## Objetivo

O projeto foi desenvolvido como uma melhoria para o sistema Help Med CWB, permitindo que, ao informar um CEP, sejam obtidos automaticamente os dados de logradouro, bairro, cidade e UF.

A aplicação também foi utilizada para aplicação prática de conceitos de DevOps, incluindo controle de versão, branches, commits, Pull Requests, testes automatizados e integração contínua.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- ViaCEP
- Jest
- Supertest
- Git
- GitHub
- GitHub Actions

## Funcionalidade principal

A API disponibiliza o endpoint:

```http
GET /api/cep/:cep