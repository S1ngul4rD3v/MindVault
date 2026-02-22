import { Model, DataTypes } from 'sequelize';

export default (sequelize, dataTypes = DataTypes) => {
  class Note extends Model {
    static associate(models) {
      // define association here
    }
  }
  Note.init(
    {
      title: dataTypes.STRING,
      content: dataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Note',
      tableName: 'notes',
    }
  );
  return Note;
};
