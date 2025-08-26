# URL Shortener API

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

Um encurtador de URL simples desenvolvido com Typescript, Express e Prisma ORM. O projeto permite encurtar URLs longas, redirecionar para a URL original usando o código curto e rastrear o número de cliques.

## ✨ Tecnologias Utilizadas

-   **Backend**: Node.js, Express.js
-   **Linguagem**: TypeScript
-   **Banco de Dados**: PostgreSQL
-   **ORM**: Prisma
-   **Validação**: Zod
-   **Geração de ID**: Nano ID
-   **Dev Tools**: TSX (para rodar o projeto em modo de desenvolvimento)

## 🚀 Começando

Siga estas instruções para ter uma cópia do projeto rodando na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma instância do **PostgreSQL** rodando.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mateusvcsmoura/url-shortener.git
    cd url-shortener
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de `.env.example`.
    -   Preencha as variáveis necessárias:
    ```env
    # Porta em que o servidor irá rodar
    PORT=4000

    # URL de conexão com o banco de dados PostgreSQL
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"
    ```

4.  **Rode as migrações do Prisma:**
    -   Este comando irá criar as tabelas no seu banco de dados com base no `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

## 🏃 Como Rodar a Aplicação

-   **Modo de Desenvolvimento (com live-reload):**
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:4000` (ou a porta que você definiu no `.env`).

-   **Modo de Produção:**
    ```bash
    # 1. Compila o código TypeScript para JavaScript
    npm run build

    # 2. Inicia o servidor a partir dos arquivos compilados
    npm run start
    ```

## 📚 Documentação da API

A URL base para todas as rotas é `/api/url`.

---

### `POST /api/url/shorten`

Cria uma nova URL encurtada.

-   **Request Body**:
    ```json
    {
      "longUrl": "https://www.google.com/search?q=typescript"
    }
    ```

-   **Success Response (201 Created)**:
    -   Retorna o objeto do novo registro da URL criado no banco.
    ```json
    {
      "id": 1,
      "longUrl": "https://www.google.com/search?q=typescript",
      "shortCode": "AbC1dE2f",
      "clicks": 0,
      "createdAt": "2025-08-26T16:30:00.000Z"
    }
    ```

-   **Error Responses**:
    -   **400 Bad Request**: Se o corpo da requisição estiver ausente ou `longUrl` não for uma string válida.
    -   **409 Conflict**: Se a URL enviada já foi encurtada anteriormente.
    -   **500 Internal Server Error**: Se ocorrer um erro inesperado, como a falha ao gerar um código único após várias tentativas.

---

### `GET /api/url/:shortCode`

Redireciona para a URL original correspondente ao `shortCode` e incrementa o contador de cliques.

-   **URL Params**:
    -   `shortCode` (string): O código único gerado para a URL.
    -   Exemplo: `http://localhost:4000/api/url/AbC1dE2f`

-   **Success Response (302 Found)**:
    -   Redireciona o cliente para a `longUrl` original.

-   **Error Responses**:
    -   **404 Not Found**: Se o `shortCode` fornecido não existir no banco de dados.
    -   **500 Internal Server Error**: Se ocorrer um erro inesperado ao buscar a URL.

---

### `DELETE /api/url/delete-url`

Deleta um registro de URL do banco de dados pelo seu ID.

-   **Request Body**:
    ```json
    {
      "id": 1
    }
    ```

-   **Success Response (204 No Content)**:
    -   Retorna um corpo vazio, indicando que o recurso foi deletado com sucesso.

-   **Error Responses**:
    -   **400 Bad Request**: Se o `id` não for um número inteiro válido.
    -   **404 Not Found**: Se não houver nenhum registro de URL com o `id` fornecido.