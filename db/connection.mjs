import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

try {
  sequelize.authenticate();
  console.log('Autenticado com sucesso!');
} catch (error) {
  console.log(`Não foi possivel autenticar: ${error}`);
}

export default sequelize;
