const fs = require('fs');
const ghBot = require('./bots/githubBot');

// const twTweet = require('./bots/twitter/twTweet');
// const twSearch = require('./bots/twitter/twSearch');

async function start(){
    await ghBot.getCommits()
    // await readCommits();
    // await setInterval(readCommits, 60000);    
}

async function readCommits(){
    // githubBot(message => {
    //     twSearch(message)
    //         .then(resultSearch => {
    //             if(resultSearch === null){
    //                 console.log(`>> Tweeting commit... '${message}'`);
    //                 // twTweet(message);
    //             }
    //             else{
    //                 console.log(`>> Commit already tweeted: '${message}'`);
    //             }
    //         });    
    // });
}

start();