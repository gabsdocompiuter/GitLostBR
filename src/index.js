const fs = require('fs');
const githubBot = require('./githubBot');

const twTweet = require('./twitter/twTweet');
const twSearch = require('./twitter/twSearch');

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