const tw = require('./tw.js');

function bot(status){
    let twitter = tw();

    twitter.post('statuses/update', {
        status
    });
}

module.exports = bot;
