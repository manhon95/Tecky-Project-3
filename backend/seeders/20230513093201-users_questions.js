'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_questions', [
      {
        user_id: 2,
        question_id: 1,
        answer:
          'Yes, of course. Prior knowledge of programming or any computer skills is not required. Our course is designed for everyone and will cover all the necessary knowledge you need to know in order to be a programmer. Our mentors will provide guidance throughout the whole course.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 2,
        answer:
          'Not at all. Our course covers mostly practical knowledge from the industry. From our experience, those with prior computer science knowledge may choose to take on more advanced topics for their group projects and achieve better outcomes such as higher monthly salaries than average. They may also be potentially offered senior developer positions immediately after graduating.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 3,
        answer:
          'Yes. We do provide both digital and printed certificates upon graduation.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 4,
        answer:
          'Yes. We offer credit card instalment scheme over 6, 9 or 12 months.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 5,
        answer:
          '95% of the active job-seeking graduates trained by our instructors have secured a job offer from IT industry within 3 months after graduation.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 6,
        answer:
          'A bachelor degree in computer science focuses predominantly on theoretical knowledge in the field Computer Science, with the emphasis normally on the understanding of the computer science knowledge.​In contrast, our MicroMaster in Programming focuses on the practical aspects necessary to succeed in the real-world programming environment, including practical skills and knowledge which are crucial for application development in a professional setting.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 7,
        answer:
          'Our course require students to be present in class whereas online courses provides a lot of flexibility for students to learn at their own pace. At Tecky, we firmly believe the importance of working together with other learners in an in-person manner(peer-learning) as it simulates the real world environment to prepare our students better for employment following graduation.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 8,
        answer:
          'It is just 8-minute walk from Tsuen Wan West Station to our campus. For those who are closer to Tsuen Wan Station, we will provide a shuttle bus card for each student.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 9,
        answer:
          'Yes. We do offer trial lessons. Please contact us for more information.',
        enable: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_questions', null);
  },
};
