'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('industries', [
      {
        name: 'Education',
      },
      {
        name: 'Hardware',
      },
      {
        name: 'Food',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('industries', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
