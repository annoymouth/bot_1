const fs = require('fs');

module.exports = [
  {
    data: {
      name: 'answer1'
    },
    async execute(interaction) {
      require(`../../etc/answer_func.js`)(interaction, 1);
    }
  },
  {
    data: {
      name: 'answer2'
    },
    async execute(interaction) {
      require(`../../etc/answer_func.js`)(interaction, 2);
    }
  },
  {
    data: {
      name: 'answer3'
    },
    async execute(interaction) {
      require(`../../etc/answer_func.js`)(interaction, 3);
    }
  },
  {
    data: {
      name: 'answer4'
    },
    async execute(interaction) {
      require(`../../etc/answer_func.js`)(interaction, 4);
    }
  },
  {
    data: {
      name: 'answer5'
    },
    async execute(interaction) {
      require(`../../etc/answer_func.js`)(interaction, 5);
    }
  }
]