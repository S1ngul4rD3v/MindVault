import Sequelize from 'sequelize';
import configModule from '../config/database.cjs';
import noteFactory from './note.js';

const env = process.env.NODE_ENV || 'development';
const config = configModule[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
};

const Note = noteFactory(sequelize, Sequelize.DataTypes);
db.Note = Note;

if (Note.associate) {
  Note.associate(db);
}

export default db;
