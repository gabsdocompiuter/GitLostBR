const twit = require('twit');
const ttConfig = require('../credentials/twitter.json');

function bot(){
    return new twit(ttConfig);
}

module.exports = bot;
