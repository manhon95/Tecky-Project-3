'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Tecky',
        password: await bcrypt.hash('Tecky', 10),
        role: 'user',
        email: 'tecky@example.com',
      },
      {
        name: 'SteamDeck',
        password: await bcrypt.hash('SteamDeck', 10),
        role: 'user',
        email: 'steamdeck@example.com',
      },
      {
        name: 'PandaPro',
        password: await bcrypt.hash('PandaPro', 10),
        role: 'user',
        email: 'pandapro@example.com',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      { role: 'user' },
      { restartIdentity: true },
    );
  },
};
