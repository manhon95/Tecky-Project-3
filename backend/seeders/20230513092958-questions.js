'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('questions', [
      {
        industry_id: 1,
        type: 'Custom',
        question:
          'I don’t have any experience at all. Will I be able to complete this course?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question:
          'I do have some previous experiences in coding. Will this course be too easy for me?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'Is there any certificate for the course?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'Can I make payments in instalments?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question:
          'After completing the course, can I really secure a job offer?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'How is the course different from a university degree?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'How is the course different from an online course?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'Is it far away from Tsuen Wan West Station?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: 'Do you offer trial lessons?',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null);
  },
};
