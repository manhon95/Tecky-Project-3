'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  questions.init(
    {
      industry_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      question: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'questions',
    },
  );
  return questions;
};
