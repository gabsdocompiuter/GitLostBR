const Twit = require('twit')
const ttConfig = require('../credentials/twitter.json');

module.exports = new Twit({
    consumer_key: ttConfig.consumer_key,
    consumer_secret: ttConfig.consumer_secret,
    access_token: ttConfig.access_token,
    access_token_secret: ttConfig.access_token_secret
});
