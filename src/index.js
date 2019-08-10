const ghBot = require('./bots/GithubBot');
const twBot = require('./bots/TwitterBot');

async function start(){
    const commits = await getCommits();
    const messagesToTweet = await checkTweets(commits);

    await tweetCommits(messagesToTweet);
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

async function tweetCommits(messagesToTweet){
    await waitEach(messagesToTweet, async (currentMessage) => {
        await twBot.tweet(currentMessage);
    }, 5000);
}

start();