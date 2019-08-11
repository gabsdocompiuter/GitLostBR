const githubAPI = require('../services/GithubAPI');

const wordsFilter = require('../filterWords.json');

module.exports = {
    async getCommits(){
        const messagesFound = [];

        await waitEach(wordsFilter.words, async (word) => {

            console.log(`>> Procurando commits com a palavra '${word}'...`);

            await githubAPI.get(`/search/commits?q=${word}+author-date:>=${getDate()}`, {
                headers: {
                    'Accept': 'application/vnd.github.cloak-preview',
                }
            })
                .then((response) => {
                    if(response.data.items.length === 0){
                        console.log(`   >> Nenhum commit encontrado...`)
                    }
        
                    response.data.items.map((item) => {
                        let commitMessage = item.commit.message;
                        
                        if(commitMessage.length > 100){
                            console.log(`   >> Ignorando commit devido a seu tamanho...`)
                        }
                        else{
                            console.log(`   >> Adicionando commit '${commitMessage}' à lista...`);
                            messagesFound.push(commitMessage);
                        }
                    });

                })
                .catch((error) => {
                    console.log(`   >> Houve um erro ao tentar obter os commits`);
                });

            console.log('> Aguardando para conectar novamente ao GitHub...');
            console.log();
        }, 10000)

        return messagesFound;
    }
}

async function waitEach(array, callback, time){
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    for(let i = 0; i < array.length; i++){
        await waitFor(time);
        await callback(array[i], i, array);
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