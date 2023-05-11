'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  requests.init(
    {
      user_id: DataTypes.INTEGER,
      from_time: DataTypes.DATE,
      to_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'requests',
    },
  );
  return requests;
};
