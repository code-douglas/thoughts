// Packages import
import express from 'express';
import expbhs from 'express-handlebars';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import flash from 'express-flash';

// DB connection import
import connection from './db/connection.mjs';

// Initialize packages
const app = express();
const FileStore = sessionFileStore(session);

// Initialize database
connection
  .sync()
  .then(() => {
    app.listen(3003);
    console.log('Servidor rodando: http://localhost:3003');
  })
  .catch(
    (error) => console.log(`Falha na conexao: ${error}`)
  );
