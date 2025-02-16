import express from 'express';
import expbhs from 'express-handlebars';
import connection from './db/connection.mjs';
import Tought from './models/Tought.mjs';
import User from './models/User.mjs';
import sessionMiddleware from './middlewares/sessionMiddleware.mjs';
import toughtsRoutes from './routes/toughtsRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

const app = express();

app.engine('handlebars', expbhs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Aplicando middleware de sessão
app.use(sessionMiddleware);
app.use('/toughts', toughtsRoutes);
app.use('/', toughtsRoutes);
app.use('/', authRoutes);

connection
  .sync()
  .then(() => {
    app.listen(3003);
    console.log('Servidor rodando: http://localhost:3003');
  })
  .catch(
    (error) => console.log(`Falha na conexão: ${error}`)
  );
