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
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Can you have multiple Steam accounts on one Steam Deck?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Can I run non-Steam games through Proton on Steam Deck?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'Will Steam on Steam Deck have an ‘Add a Game’ feature like Steam on desktop?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Will the UI on Steam Deck replace Big Picture?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'Will improvements to Proton for Steam Deck (like anti-cheat support) also apply to Proton on desktop?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'How will SteamOS and Steam Deck handle offline mode when it comes to launching games?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'What file system format does the microSD card use on Steam Deck?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Can Steam Deck be used as a PC controller?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Will Steam Deck work with PC VR headsets?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Does docking the Deck improve performance?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'What kinds of screens do the 64 GB and 256 GB models have?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'What kinds of haptics does the Steam Deck have?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Can I purchase replacement parts for Steam Deck?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'How easy is it for end-users to replace the thumbsticks / SSD?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Does the audio jack support audio + mic?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Is the touchscreen multitouch?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'How long is the charging cable?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Will Steam Deck be available in other regions?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          'What can you tell us about the BIOS and does it allow dual-boot?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Can you boot an OS off the SD card?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question: 'Will Steam Deck support external GPUs?',
      },
      {
        industry_id: 2,
        type: 'Custom',
        question:
          "Can I change which model of Steam Deck after I've already reserved?",
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'What is pandapro?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'What benefits do I get with pandapro?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'When am I eligible to use my pandapro benefits?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'How and when can I cancel my pandapro plan?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'When will I be billed?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'Can I get a refund after I sign up?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question:
          'Can I still use other promo codes on top of my plan benefits?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'How can I sign up to pandapro?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question:
          'Will my free delivery benefits be refunded back if my order is cancelled?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'Will I get extra 5% off on every Pick-up order?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'Are there any limitations on the pandapro dine-in offers?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'Can I use the dine-in offers anytime I want?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'Who can enjoy unlimited free delivery benefit?',
      },
      {
        industry_id: 3,
        type: 'Custom',
        question: 'How can I enjoy pandapro unlimited free delivery benefits?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '我沒有任何經驗，真的能完成這個課程嗎?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '我有一點兒編程經驗，這個課程對我來說又會否太悶?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '有沒有證書?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '可以分期付款嗎?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '完成課程後，真的能找到工作嗎?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '這個課程與大學學位有何分別?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '這個課程與網上課程有何分別?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '你們距離荃灣西站遠嗎?',
      },
      {
        industry_id: 1,
        type: 'Custom',
        question: '有沒有試堂?',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
