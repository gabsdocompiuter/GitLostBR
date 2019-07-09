const twit = require('twit');
const ttConfig = require('./credentials/twitter.json');

function bot(msg){
    let twitter = new twit(ttConfig);

    tweet(msg);

    function tweet(status){
        twitter.post('statuses/update', {
            status
        });
    }
}

module.exports = bot;