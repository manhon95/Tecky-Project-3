'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      industry_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'industries',
          key: 'id',
        },
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING(1023),
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  },
};
