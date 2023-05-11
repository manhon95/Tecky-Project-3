'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      plan_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'plans',
          key: 'id',
        },
      },
      from_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      to_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.changeColumn('users', 'current_subscription_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'subscriptions',
        key: 'id',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'current_subscription_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeConstraint(
      'users',
      'users_current_subscription_id_fkey',
    );
    await queryInterface.dropTable('subscriptions');
  },
};
