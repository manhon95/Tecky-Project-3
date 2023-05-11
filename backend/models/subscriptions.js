'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subscriptions.init(
    {
      user_id: DataTypes.INTEGER,
      plan_id: DataTypes.INTEGER,
      from_time: DataTypes.DATE,
      to_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'subscriptions',
    },
  );
  return subscriptions;
};
