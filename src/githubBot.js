const fetch = require("node-fetch");
const wordsFilter = require('./json/filterWords.json');
const lastCommit = require('./json/lastCommit.json');

async function bot(callback){
    let requestInfo = {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.cloak-preview',
        }
    };

    numberOfWords = wordsFilter.words.length;

    console.log('Buscando commits...');
    await delayedLoop(numberOfWords, 3000, (word) => {
        // console.log(word);

        getLog(word, response => {
            if(response.total_count != null && response.total_count > 0){
                response.items.map(item => {
                    // if(item.commit.author.date > lastCommit.date){
                        lastCommit.date = item.commit.author.date;
                        lastCommit.message = item.commit.message;

                        console.log('commit: ', lastCommit.message);
                    // }
                });
            }
            else{
                console.error(response);
            }
        });

        // console.log();
        // console.log();
    });
    // console.log('Ultimo commit: ', lastCommit.message);

    async function delayedLoop(times, waitTime, callbackFunction){
        let i = 0;

        loop();

        function loop(){
            setTimeout(() =>{
                callbackFunction(wordsFilter.words[i]);

                i++;
                if(i < times){
                    loop();
                }
            }, waitTime);
        }
    }

    async function getLog(word, callback){
        let url = `https://api.github.com/search/commits?q=${word}+author-date:${getDate()}`;
        fetch(url, requestInfo)
            .then(r => r.json())
            .then(json => callback(json))
            .catch(err => console.error(err));
    }
}

function getDate(){
    const d = new Date();
    const year = d.getFullYear();
    const month = leftZeros(d.getMonth() + 1);
    const day = leftZeros(d.getDate());

    return `${year}-${month}-${day}`;

    function leftZeros(number){
        const length = number.toString().length;
        return length == 1 ? `0${number}` : number;
    }
}

module.exports = bot;