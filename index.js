const fs = require('fs');
const githubBot = require('./src/githubBot');
// const twBot = require('./src/twBot');

async function start(){
    createLastCommitFile();

    githubBot();
}

function createLastCommitFile(){
    const file = './src/json/lastCommit.json';
    const defValue = `{"date": "2000-01-01T00:00.00.000-00:00", "message": ""}`;

    if(!fs.existsSync(file)){
        fs.writeFile(file, defValue, err => {if (err) throw err});
    }
}

start();