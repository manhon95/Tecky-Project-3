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
      {
        user_id: 3,
        question_id: 10,
        answer:
          'Yes, and each account on a Steam Deck will keep its own local save data and settings.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 11,
        answer: 'Yes, you can run non-Steam games through Proton.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 12,
        answer:
          "Yes, we'll support adding games like we do for the desktop Steam client.",
        enable: true,
      },
      {
        user_id: 3,
        question_id: 13,
        answer:
          'That is what we’re aiming for, though the rollout will happen in stages.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 14,
        answer:
          'Yes, these improvements will make it to all systems using Proton.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 15,
        answer:
          "Just like a PC, you'll need to be online to download games and play online multiplayer games. Once a game is installed on disk, you can play while Steam Deck is offline unless the game requires an internet connection.",
        enable: true,
      },
      {
        user_id: 3,
        question_id: 16,
        answer:
          'Steam Deck microSD cards use ext4 with casefolding - Steam Deck formats SD cards to the proper format.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 17,
        answer:
          'Yes, you can connect your Steam Deck to a PC via Remote Play and use it as a controller.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 18,
        answer:
          'While technically a PC VR headset can be connected, the Steam Deck is not optimized for PC VR experiences.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 19,
        answer:
          'No, docking is more akin to plugging a USB-C hub into a PC. Steam Deck runs at full performance in portable mode.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 20,
        answer:
          "All models have a glass screen (optically bonded IPS LCD). The 512 GB model's screen has an additional anti-glare etched treatment applied to it.",
        enable: true,
      },
      {
        user_id: 3,
        question_id: 21,
        answer: 'The Steam Deck has dual LRA motors, one under each trackpad.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 22,
        answer:
          "Yep! We've collaborated with the folks at iFixit, and replacement parts and repair guides for Steam Deck can be found on their website.",
        enable: true,
      },
      {
        user_id: 3,
        question_id: 23,
        answer:
          "This is one of the most frequently asked questions we received, but the answer is a bit complicated so in this case we're answering with a video. Check it out here.",
        enable: true,
      },
      {
        user_id: 3,
        question_id: 24,
        answer: 'Yes, CTIA standard layout.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 25,
        answer: 'Yes, ten fingers.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 26,
        answer: '1.5 meters, or 4.9 feet.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 27,
        answer:
          'Steam Deck is available directly via Steam in the US, Canada, UK, and EU. We are working with Komodo to sell Steam Deck in Japan, South Korea, Taiwan, and Hong Kong.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 28,
        answer:
          'Multi-boot is supported - you can have multiple OSes installed and choose which one to boot into. Users will have access to the BIOS menu.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 29,
        answer: 'Yes, Steam Deck supports boot from microSD.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 30,
        answer: 'No, external GPUs are not supported on Steam Deck.',
        enable: true,
      },
      {
        user_id: 3,
        question_id: 31,
        answer:
          "No, once you've reserved a Steam Deck, the only way to change your model is to cancel and reserve again (this would put you at the end of the queue for your region).",
        enable: true,
      },
      {
        user_id: 4,
        question_id: 32,
        answer:
          'pandapro is a monthly subscription membership that allows you to enjoy exclusive deals and benefits on restaurant, pick-up, grocery, and dine-in orders.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 33,
        answer:
          'pro users enjoy exclusive discounts on food delivery as well as additional discounts on Pick-Up, groceries, and dine-in. For more details, click on "become a pandapro" tab right under your profile on the app or you can check out the benefits page here',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 34,
        answer:
          'You will be eligible to utilise your pandapro benefits once your order meets the minimum order amount specified in your plan.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 35,
        answer:
          'You can cancel your subscription anytime. You will continue to receive benefits until the end of your subscription. Your cancellation request will take effect on the next renewal date. To cancel your subscription, please head to the app and proceed with the following steps. Open the sidebar menu -> Tap “Subscription" -> Tap “I would like to unsubscribe”',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 36,
        answer:
          "After you choose a pandapro plan and submit your payment information, you'll be billed the plan amount shown during subscription signup at the beginning of the plan. Your plan will automatically renew at the end of the subscription on the same date as your initial sign-up until you cancel it.",
        enable: true,
      },
      {
        user_id: 4,
        question_id: 37,
        answer:
          'We will not make any refunds or prorated reimbursements for subscriptions. You can cancel your subscription anytime. You will continue to receive benefits until the end of your subscription. Your cancellation request will take effect on the next renewal date.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 38,
        answer:
          'Yes! You can use other vouchers or promo codes in addition to your pandapro free delivery and Pick-Up discount benefits, as long as you are eligible per the minimum order amount stated in your plan.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 39,
        answer:
          'You can subscribe through foodpanda app or foodpanda website. Simply click sidebar menu on the top right hand corner through app OR your profile icon through website, navigate to the “Become a pandapro” page, and subscribe to your preferred pandapro plan! Please note that all pandapro subscription related promotions are only applicable to foodpanda App',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 40,
        answer:
          'Free delivery benefits or vouchers used on a cancelled order will be reinstated within 15 minutes or so after your order is cancelled. You can reuse it after.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 41,
        answer:
          'Yes, pandapro extra 5% off benefits is applicable to all Pick-up orders.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 42,
        answer:
          'No minimum order value is needed for discount redemption. The redeemed offer is applicable on all à la carte/regular menu items except combo menus/special set menus. T&C restrictions apply.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 43,
        answer:
          "Deals are applicable 7 days a week, except on the pre-listed dates such as New Year's Day, Chinese New Year, Valentine's Day, Good Friday, day after the Mid-autumn Festival, Silent Night, Christmas, New Year's Eve and such. Also note that the benefits cannot be combined with other ongoing offers/promotions by the restaurants.",
        enable: true,
      },
      {
        user_id: 4,
        question_id: 44,
        answer:
          'All pandapro members could enjoy unlimited free delivery benefit.',
        enable: true,
      },
      {
        user_id: 4,
        question_id: 45,
        answer:
          'You shall enjoy free delivery on orders $120 and above at restaurants (excl. delivery fee) and on orders $200 and above at mall & pandamart (excl, delivery fee) for the first 50 orders per month. After the first 50 free delivery orders, you will be able to use free delivery vouchers applicable on orders over HK$250 (after discount, excluding delivery fee) at restaurants, mall or pandamart.',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 46,
        answer:
          '當然可以！無需要任何編程或電腦知識都可以報讀我們的 MicroMaster 課程。我們的 MicroMaster 課程是為所有人士而設的，涵蓋所有工作必需的知識。我們的導師將緊密而一步步協助你完成整個課程，確保每個學員最終都有能力找到工作。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 47,
        answer:
          '不會，我們的課程都是業內最新和最實用的內容。從我們的過往觀察，很多有經驗的學員，在小組專案習作中會選擇較艱深的題目，並且在完成課程後學會更廣為有用的知識，在人工方面亦比平均高出很多。大部份有經驗的學員在完成課程後，將可晉升為資深編程師 (senior developer)。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 48,
        answer: '有，凡成功畢業的學員，我們將提供電子版和印刷版證書。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 49,
        answer: '可以，我們提供 6, 9 或 12 個月信用卡免息分期。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 50,
        answer:
          '由我們培訓出來學員當中，在完成課程後立即尋覓工作的，有 95% 都能夠在課程後 3 個月內找到 IT 相關行業的工作。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 51,
        answer:
          '大學的電腦科學位通常會教授很多電腦科學相關的理論，重心會放在理論的理解而非實際工作環境所需的技術。相對之下，我們的微學位更著重職場上技能的學習，著重解決實際軟件開發會遭遇的問題。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 52,
        answer:
          '我們所有的課程都要求學生親身上課。雖然網上課程提供了學員充足的自由度去選擇學習的節奏，但我們相信與其他學員合作完成專案亦是軟件開發必須學習的技能，因為團隊合作更能模擬實際工作環境可能會遇見的問題。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 53,
        answer:
          '由荃灣西站行路到我們校舍只需 8 分鐘。如果學員較就近荃灣站，我們將提供穿梭巴士卡予每一個學員。',
        enable: true,
      },
      {
        user_id: 2,
        question_id: 54,
        answer: '有，我們可以安排試堂，請與我們聯絡。',
        enable: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_questions', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
