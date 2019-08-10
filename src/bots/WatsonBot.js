const {apikey, url} = require('../credentials/watson-nlu.json');

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: apikey,
    version: '2018-04-05',
    url: url
});

module.exports = {
    async filterPortugueseSentences(message){
        console.log(`>> Verificando atributos da sentença '${message}'...`)

        const sentenceLanguage = await getSentenceLanguage(message);
        if(sentenceLanguage){
            console.log(`   > Sentença verificada com a linguagem '${sentenceLanguage}'`);
            if(sentenceLanguage === 'pt'){
                return true;
            }
        }
        else{
            console.log('   > Houve um erro ao buscar informações sobre a sentença...');
        }
        return false;
    }
}

async function getSentenceLanguage(sentence){
    return new Promise((resolve, reject) => {
        nlu.analyze({
            text: sentence,
            features: {
                keywords: {}
            }
        }, (error, response) => {
            if (error) {
                resolve(false);
            }else{
                resolve(response.language);
            }
        });
    });
}