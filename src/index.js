const ghBot = require('./bots/GithubBot');
const twBot = require('./bots/TwitterBot');
const wtBot = require('./bots/WatsonBot');

async function start(){
    bot();
    setInterval(bot, 6000);

    async function bot(){
        const allCommits = await getCommits();
        const newCommits = await checkTweets(allCommits);
        const commitsToTweet = await filterPortugueseCommits(newCommits);

        await tweetCommits(commitsToTweet);

        console.log();
        console.log(`>>>> Aguardando próxima interação com o bot...`)
    }
}

async function waitEach(array, callback, time){
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    for(let i = 0; i < array.length; i++){
        await waitFor(time);
        await callback(array[i], i, array);
    }
}

async function getCommits(){
    console.log(`>>>> Buscando commits do GitHub...`);
    console.log();

    return await ghBot.getCommits()
}

async function checkTweets(commits){
    console.log();
    console.log(`>>>> Verificando commits ainda não twitados...`);
    console.log();

    const messagesToTweet = [];
    await waitEach(commits, async (currentCommit) => {
        const alreadyTwiteed = await twBot.search(currentCommit);

        if(!alreadyTwiteed){
            messagesToTweet.push(currentCommit);
        }
    }, 5000);

    return messagesToTweet;
}

async function filterPortugueseCommits(newCommits){
    console.log();
    console.log(`>>>> Filtrando commits em português...`);
    console.log();

    const portugueseCommits = [];

    await waitEach(newCommits, async currentCommit => {
        const result = await wtBot.filterPortugueseSentences(currentCommit);

        if(result === true){
            portugueseCommits.push(currentCommit);
        }
    }, 1000);

    return portugueseCommits
}

async function tweetCommits(commitsToTweet){
    await waitEach(commitsToTweet, async (currentMessage) => {
        await twBot.tweet(currentMessage);
    }, 5000);
}

start();