const fs = require('fs');
const githubBot = require('./src/githubBot');

const twTweet = require('./src/twitter/twTweet');
const twSearch = require('./src/twitter/twSearch');

async function start(){
    await readCommits();
    await setInterval(readCommits, 60000);    
}

async function readCommits(){
    githubBot(message => {
        twSearch(message)
            .then(resultSearch => {
                if(resultSearch === null){
                    console.log(`>> Tweeting commit... '${message}'`);
                    twTweet(message);
                }
                else{
                    console.log(`>> Commit already tweeted: '${message}'`);
                }
            });    
    });
}

start();