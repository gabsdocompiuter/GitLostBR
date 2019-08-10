const fs = require('fs');
const ghBot = require('./bots/GithubBot');

// const twTweet = require('./bots/twitter/twTweet');
// const twSearch = require('./bots/twitter/twSearch');

async function start(){
    const commits = await ghBot.getCommits()

    commits.map((commit) => {
        console.log(commit);
        console.log();
    })
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