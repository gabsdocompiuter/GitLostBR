const TwitterAPI = require('../services/TwitterAPI');
const twConfig = require('../credentials/twitter');

module.exports = {
    async search(statusToSearch){
        console.log(`>> Verificando se a mensagem já foi twitada... '${statusToSearch}'`);

        const query = `"${statusToSearch}" (from:${twConfig.userId})`;

        let statusAlreadyTwiteed = true;

        await twSearch(query)
            .then(response => {
                statusAlreadyTwiteed = response;
            })

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

    TwitterAPI.get('search/tweets', {
        q: query,
        count: 1
    }, (err, data, response) => {
        console.log('dentro do negócio')
        statusAlreadyTwiteed = true;
        // console.log(err);
        // console.log(data);
        // console.log(response);

        
    //     if(err){
    //         console.log(`   >> Houve um erro ao pesquisar essa mensagem...`);
    //     }
    //     else{
    //         if(data.statuses.length > 0){
    //             console.log(`   >> Essa mensagem já foi twitada...`);

    //             statusAlreadyTwiteed = true;
    //         }
    //         else{
    //             console.log(`   >> Essa mensagem ainda não foi twitada...`);
    //         }    
    //     }
    });
}