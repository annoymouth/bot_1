const fs = require('fs');

module.exports = (client) => {
    client.initPollData = async () => {
        let poll = {
            title: 'title',
            answer1: 'answer1',
            answer2: 'answer2',
            answer3: 'answer3',
            answer4: 'answer4',
            answer5: 'answer5',
            answer1_votes: 0,
            answer2_votes: 0,
            answer3_votes: 0,
            answer4_votes: 0,
            answer5_votes: 0,
            startDate: 0,
            endDate: 0,
            username: 'username',
            usericon: 'usericon',
            userid: 0,
            pollstatus: 'offline'
        };

        //delete require.cache[require.resolve('../../database/poll/poll_array.js')]

        try {
            fs.writeFileSync(`./src/database/poll/poll_array.js`, 'module.exports = ' + JSON.stringify(poll));
        } catch (error) {
            console.error(error);
        }
    }
}