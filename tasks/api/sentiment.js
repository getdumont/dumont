require('node-env-file')(`${__dirname}/.env`);

const { Task } = require('appajs');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

module.exports = (field) => {
    Task((data) => {
        const document = {
            content: data[field],
            type: 'PLAIN_TEXT',
            language: 'pt'
        };

        return client
            .analyzeSentiment({document})
            .then(([{documentSentiment}]) => ({
                score: documentSentiment.score,
                magnitude: documentSentiment.magnitude
            }))
    });
}