const tw = require('./tw.js');

async function bot(status){
    let twitter = tw();
    let query = `"${status}" (from:gitlostbr)`;

    return await search(query);
       
    async function search(query){
        return new Promise((resolve) => {
            twitter.get('search/tweets', {
                q: query,
                count: 1
            }, (err, data, response) => {
                if(data.statuses != null && data.statuses.length > 0){
                    resolve(data.statuses[0].text);
                }
                else{
                    resolve(null);
                }
            })
        });
    }
}

module.exports = bot;
