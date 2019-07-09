const fetch = require("node-fetch");
const wordsFilter = require('./filterWords.json');

async function bot(){
    let requestInfo = {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.cloak-preview',
        }
    };

    wordsFilter.words.map(w => getLog(w, r => console.log(r)));

    async function getLog(word, callback){  
        let url = `https://api.github.com/search/commits?q=${word}+author-date:${getDate()}`;
        fetch(url, requestInfo)
            .then(r => r.json())
            .then(json => callback(json));
    }
}

function getDate(){
    const d = new Date();
    const year = d.getFullYear();
    const month = leftZeros(d.getMonth());
    const day = leftZeros(d.getDay());

    return `${year}-${month}-${day}`;

    function leftZeros(number){
        const length = number.toString().length;
        return length == 1 ? `0${number}` : number;
    }
}

module.exports = bot;