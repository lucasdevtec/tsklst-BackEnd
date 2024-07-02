# Projeto de API - TaskList

## Descrição

Este projeto é uma API RESTful que fornece uma interface para gerenciar recursos de um sistema específico. Ele inclui diversos endpoints que permitem criar, ler, atualizar e deletar dados.

## Principais Tecnologias Utilizadas

- **Linguagem:** [Typescript](https://www.typescriptlang.org/)
- **Framework:** [Express](https://expressjs.com/pt-br/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)

## Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/lucasdevtec/tsklst-BackEnd.git
   cd tsk-lst-BackEnd
   ```

2. **Instale as Dependências:**

   ```sh
   npm install
   ```

3. **Rode o docker compose para subir o bando:**

   ```sh
   docker compose up -d
   ```

4. **Crie o aquivo .env com as informações contidas no env.example:**

   ```python
   #            DBSel        user   pw     ip        port DBName
   DATABASE_URL=postgresql://prisma:prisma@localhost:5432/postgres
   #Gere o Hash MD5 e cole-0 abaixo!
   #link de onde gerar: https://www.md5hashgenerator.com/
   #Texto Usado:
   HASHMD5JWT=
   #Altere a DATABASE_URL conforme o necessário
   ```

## Endpoints

### **Usuários**

#### Criar Usuário

- **Endpoint:** `/users`
- **Método:** `POST`
- **Descrição:** Cria um novo usuário.
- **Body de Exemplo:**

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "senha123"
}
```

- **Resposta de Exemplo:**

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

#### Gerar token de acesso Usuário

- **Endpoint:** `/users/session`
- **Método:** `post`
- **Descrição:** Gera token de acesso jwt para acessar as demais rotas.
- **Body de Exemplo:**

```json
{
  "email": "joao.silva@example.com",
  "password": "senha123"
}
```

- **Resposta de Exemplo:**

```json
{
  "user": "João Silva",
  "email": "joao.silva@example.com",
  "status": "authenticated",
  "token": "TokenJWTsimplesQueiráDurar5h"
}
```

#### Detalhes do Usuário

- **Endpoint:** `/me`
- **Método:** `GET`
- **Descrição:** Retorna o nome, email e data de criação de um usuário.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Resposta de Exemplo:**

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "createdAt": "2024-06-30T21:21:52.138Z"
}
```

#### Atualizar Usuário

- **Endpoint:** `/me`
- **Método:** `PUT`
- **Descrição:** Atualiza as informações de um usuário existente.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Body de Exemplo:**

```json
{
  "name": "João Silva Bezerra",
  "email": "joao.silva@example.com",
  "password": "senha123",
  "newPassword": "help1234"
}
```

- **Resposta de Exemplo:**

```json
{
  "name": "João Silva Bezerra",
  "email": "joao.silva@example.com",
  "updatedAt": "2024-07-02T01:41:09.994Z",
  "password": "Alterado com Sucesso"
}
```

- O "name" e o "email" podem ser mandados individualmente, porém para alterar a senha é necessário ambos os parâmetros: "password" e "newPassword".

#### Deletar Usuário

- **Endpoint:** `/me`
- **Método:** `DELETE`
- **Descrição:** Deleta um usuário pelo ID.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Resposta de Exemplo:**

```json
{
  "deletedUser": {
    "id": 1,
    "email": "joao.silva@example.com",
    "name": "João Silva Bezerra",
    "createdAt": "2024-07-01T23:54:04.955Z",
    "updatedAt": "2024-07-02T01:48:06.730Z",
    "deletedAt": "2024-07-02T01:48:06.729Z"
  }
}
```

### **Tasks**

#### Criar Task

- **Endpoint:** `/tasks`
- **Método:** `POST`
- **Descrição:** Cria uma nova Task.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Body de Exemplo:**

```json
{
  "title": "Olá Mundo",
  "content": "Conteúdo"
}
```

- **Resposta de Exemplo:**

```json
{
  "id": 1,
  "authorId": 1,
  "title": "Olá Mundo",
  "content": "Conteúdo",
  "status": false,
  "createdAt": "2024-07-02T01:04:53.363Z",
  "updatedAt": "2024-07-02T01:04:53.363Z"
}
```

- O "title" é obrigatório para criar a task, porém o content é opcional.

#### Listar Tasks

- **Endpoint:** `/tasks`
- **Método:** `GET`
- **Descrição:** Retorna a lista de todas as tasks do usuário logado.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Resposta de Exemplo:**

```json
[
  {
    "id": 1,
    "authorId": 1,
    "title": "Olá Mundo",
    "content": "Conteúdo",
    "status": false,
    "createdAt": "2024-07-02T01:04:53.363Z",
    "updatedAt": "2024-07-02T01:04:53.363Z"
  }
]
```

#### Atualizar Task

- **Endpoint:** `/tasks`
- **Método:** `PUT`
- **Descrição:** Atualiza as informações de um produto existente.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Body de Exemplo:**

```json
{
  "idTask": "1",
  "title": "Serelepe",
  "content": "Outro Conteudo",
  "status": 1
}
```

- **Resposta de Exemplo:**

```json
{
  "id": 1,
  "title": "Serelepe",
  "content": "Outro Conteudo",
  "status": true,
  "createdAt": "2024-07-01T23:54:32.260Z",
  "updatedAt": "2024-07-02T02:15:13.425Z"
}
```

- O único paramêtro obrigatório é o "idTask", caso apenas ele seja enviado, Task será tocada e assumirá o updatedAt mais recente.
- O status apenas aceita 0 ou 1. Sendo 0 para false e 1 para true.

#### Deletar Task

- **Endpoint:** `/tasks`
- **Método:** `DELETE`
- **Descrição:** Deleta um produto pelo ID.
- **Cabeçalho:**

  ```http
  Authorization: Bearer <seu_token_aqui>
  ```

- **Body de Exemplo:**

```json
{
  "idTask": "1"
}
```

- **Resposta de Exemplo:**

```json
{
  "id": 1,
  "authorId": 1,
  "title": "Serelepe",
  "content": "Outro Conteudo",
  "status": true,
  "createdAt": "2024-07-01T23:54:32.260Z",
  "updatedAt": "2024-07-02T02:20:08.886Z",
  "deletedAt": "2024-07-02T02:20:08.885Z"
}
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adicionei uma nova feature'`).
4. Envie para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Author

- LinkedIn - [Lucas Oliveira](https://www.linkedin.com/in/lucasdevtec/)
