import express from 'express';
import expbhs from 'express-handlebars';
import connection from './db/connection.mjs';
import sessionMiddleware from './middlewares/sessionMiddleware.mjs';

const app = express();

app.engine('handlebars', expbhs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Aplicando middleware de sessão
app.use(sessionMiddleware);

connection
  .sync()
  .then(() => {
    app.listen(3003);
    console.log('Servidor rodando: http://localhost:3003');
  })
  .catch(
    (error) => console.log(`Falha na conexão: ${error}`)
  );
