import { DataTypes } from 'sequelize';
import connection from '../db/connection.mjs';

const User = connection.define('User', {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  }
});

export default User;
