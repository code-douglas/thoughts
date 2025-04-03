# Toughts App

Este é um aplicativo de gerenciamento de pensamentos (Toughts) desenvolvido com Node.js, Express, Sequelize e Handlebars.

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**
- **Handlebars**
- **Express-session**
- **Express-flash**

## Estrutura do Projeto

```
📂 thoughts
 ┣ 📂 controllers
 ┃ ┣ 📜 AuthController.mjs
 ┃ ┣ 📜 ToughtsController.mjs
 ┣ 📂 db
 ┃ ┣ 📜 connection.mjs
 ┣ 📂 middlewares
 ┃ ┣ 📜 checkUserAuth.mjs
 ┃ ┣ 📜 sessionMiddleware.mjs
 ┣ 📂 models
 ┃ ┣ 📜 Tought.mjs
 ┃ ┣ 📜 User.mjs
 ┣ 📂 public
 ┣ 📂 routes
 ┃ ┣ 📜 authRoutes.mjs
 ┃ ┣ 📜 toughtsRoutes.mjs
 ┣ 📂 views
 ┃ ┣ 📂 auth
 ┃ ┃ ┣ 📜 login.handlebars
 ┃ ┃ ┣ 📜 register.handlebars
 ┃ ┣ 📂 layouts
 ┃ ┃ ┣ 📜 main.handlebars
 ┃ ┣ 📂 toughts
 ┃ ┃ ┣ 📜 create.handlebars
 ┃ ┃ ┣ 📜 dashboard.handlebars
 ┃ ┃ ┣ 📜 edit.handlebars
 ┃ ┃ ┣ 📜 home.handlebars
 ┣ 📜 app.mjs
 ┣ 📜 package.json
 ┣ 📜 .gitignore
 ┣ 📜 README.md
 ┣ 📜 .env
```

## Configuração do Banco de Dados
1. Instale o MySQL.
2. Configure a conexão no arquivo `db/connection.mjs`.
3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes configurações:

```
DB_NAME=toughts
DB_USER=root
DB_PASSWORD='230820@Maria'
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
```

4. No arquivo `db/connection.mjs`, utilize as variáveis de ambiente:

```js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

export default connection;
```

## Instalação e Execução
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   npm start
   ```

## Funcionalidades
- **Autenticação de Usuário**: Registro, login e logout.
- **Gerenciamento de Pensamentos**: Criar, editar, excluir e visualizar pensamentos.
- **Painel do Usuário**: Visualizar e gerenciar pensamentos do usuário logado.

## Rotas Principais

### Autenticação (`authRoutes.mjs`)
- `GET /login` - Página de login
- `POST /login` - Autenticação de usuário
- `GET /register` - Página de registro
- `POST /register` - Registro de novo usuário
- `GET /logout` - Logout do usuário

### Pensamentos (`toughtsRoutes.mjs`)
- `GET /add` - Formulário para adicionar um pensamento
- `POST /add` - Salvar um novo pensamento
- `GET /edit/:id` - Formulário para editar um pensamento
- `POST /edit/` - Salvar alterações em um pensamento
- `GET /dashboard` - Painel do usuário
- `POST /remove` - Excluir um pensamento
- `GET /` - Exibir todos os pensamentos públicos

## Layout e Estilos
Os estilos do projeto estão definidos no arquivo `public/styles.css`, garantindo um layout escuro com detalhes em laranja para destaque.

## Licença
Este projeto é de código aberto e pode ser utilizado e modificado livremente.
