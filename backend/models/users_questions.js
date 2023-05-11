'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class users_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_questions.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
      enable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'users_questions',
    },
  );
  return users_questions;
};
