# Gerenciamento de Filmes

## Descrição

Este projeto é uma aplicação backend desenvolvida com Node.js e Express, destinada a gerenciar informações sobre filmes, usuários e filmes assistidos. A aplicação inclui funcionalidades como CRUD para usuários e filmes, marcação de filmes como assistidos, geração de relatórios de filmes assistidos e redefinição de senha. A documentação da API está disponível via Swagger.

## Funcionalidades

- **Gerenciamento de Filmes**
  - Obter todos os filmes.
  - Obter filmes por tema.
  - Obter filmes de um usuário específico.

- **Gerenciamento de Usuários**
  - Criar, atualizar, listar e deletar usuários.
  - Login de usuários.
  - Redefinição de senha.

- **Filmes Assistidos**
  - Marcar um filme como assistido.
  - Desmarcar um filme como assistido.
  - Gerar relatório de filmes assistidos por usuário.

## Endpoints

### Filmes

- **GET /api/films/{id}** - Obter um filme pelo ID.
- **GET /api/films/theme/{themeId}** - Obter filmes por tema.
- **GET /api/films** - Obter todos os filmes.

### Usuários

- **GET /api/users** - Listar todos os usuários.
- **POST /api/users/register** - Criar um novo usuário.
- **POST /api/users/login** - Login do usuário.
- **GET /api/users/{id}** - Obter um usuário pelo ID.
- **PUT /api/users/{id}** - Atualizar um usuário pelo ID.
- **DELETE /api/users/{id}** - Excluir um usuário pelo ID.
- **POST /api/users/password-reset** - Iniciar a redefinição de senha.
- **POST /api/users/password-reset/{token}** - Redefinir a senha usando o token.

### Filmes Assistidos

- **POST /api/watched-films/mark** - Marcar um filme como assistido.
- **DELETE /api/watched-films/unmark** - Desmarcar um filme como assistido.
- **GET /api/watched-films/report/{userId}** - Gerar relatório de filmes assistidos por usuário.

## Instalação

1. Clone o repositório:

   ```bash
   git clone git@github.com:RawdneyGoncalves/desafio-vylex.git
 


 #### Configuração do docker

Para rodar a aplicação usando Docker, siga os passos abaixo:

1. **Crie um arquivo `docker-compose.yml` no diretório raiz do projeto com o seguinte conteúdo:**

    ```yaml
    version: '3.8'
    services:
      app:
        build: .
        ports:
          - "3000:3000"
        volumes:
          - .:/usr/src/app
          - /usr/src/app/node_modules
        environment:
          NODE_ENV: development
          DB_HOST: db
          DB_PORT: 3306
          DB_USERNAME: root
          DB_PASSWORD: root123
          DB_NAME: sys
        depends_on:
          - db

      db:
        image: mysql:5.7
        environment:
          MYSQL_ROOT_PASSWORD: root123
          MYSQL_DATABASE: sys
          MYSQL_USER: root
          MYSQL_PASSWORD: root123
        ports:
          - "3306:3306"
        volumes:
          - mysql_data:/var/lib/mysql

    volumes:
      mysql_data:
    ```

2. **Crie um Dockerfile no diretório raiz do projeto com o seguinte conteúdo:**

    ```dockerfile
    FROM node:21.7.3

    WORKDIR /usr/src/app

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD ["npm", "run", "start"]
    ```

### Execução

1. **Inicie os serviços usando Docker Compose:**

    ```bash
    docker-compose up -d
    ```

2. **Acesse a aplicação em `http://localhost:3000` e a base de dados MySQL em `localhost:3306`.**

## Documentação da API

A documentação da API está disponível no Swagger UI. Você pode acessá-la através do seguinte endpoint:

- **[Documentação da API](http://localhost:3000/api/docs)**

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL
- Swagger
- MongoDb
- Module Alias