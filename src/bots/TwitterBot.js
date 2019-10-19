const TwitterAPI = require('../services/TwitterAPI');

module.exports = {
    async search(statusToSearch){
        console.log(`>> Verificando se a mensagem já foi twitada... '${statusToSearch}'`);

        const query = `"${statusToSearch}" (from:${process.env.TWITTER_USER_ID})`;

        let statusAlreadyTwiteed = true;

        await twSearch(query)
            .then(response => {
                statusAlreadyTwiteed = response;
            })
            .catch(error => console.error(error));

        return statusAlreadyTwiteed;
    },

    async tweet(contentToTweet){
        console.log(`>> Twitando mensagem '${contentToTweet}'...`);

        TwitterAPI.post('statuses/update', {
            status: contentToTweet
        });
    }
}

async function twSearch(query){
    return new Promise((resolve) => {
        TwitterAPI.get('search/tweets', {
            q: query,
            count: 1
        }, (err, data, response) => {
            if(err){
                console.log(`   >> Houve um erro ao pesquisar essa mensagem...`);
                resolve(false);
            }
            else{
                if(data.statuses.length > 0){
                    console.log(`   >> Essa mensagem já foi twitada...`);

                    resolve(true);
                }
                else{
                    console.log(`   >> Essa mensagem ainda não foi twitada...`);
                    resolve(false);
                }    
            }
        })
    });
}
