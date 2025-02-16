import { DataTypes } from 'sequelize';
import connection from '../db/connection.mjs';
import User from './User.mjs';

const Tought = connection.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  }
});

Tought.belongsTo(User);
User.hasMany(Tought);

export default Tought;
