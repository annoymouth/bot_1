const { Schema, model } = require('mongoose');
const testSchema = new Schema({
    _id: { type: String },
    poll_data: {
        title: { type: String },
        answer1: { type: String },
        answer2: { type: String },
        answer3: { type: String },
        answer4: { type: String },
        answer5: { type: String },
        answer1_votes: { type: Number },
        answer2_votes: { type: Number },
        answer3_votes: { type: Number },
        answer4_votes: { type: Number },
        answer5_votes: { type: Number },
        startDate: { type: Number },
        endDate: { type: Number },
        members: { type: Array },
        username: { type: String },
        usericon: { type: String },
        userid: { type: String },
        pollstatus: { type: String },
        messageid: { type: String }
    }
});

module.exports = model('pollModel', testSchema, 'poll_data');