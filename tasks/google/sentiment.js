#!/usr/bin/env node
require('node-env-file')(`${__dirname}/.env`);

const { Task } = require('appajs');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

const getSentiment = (text) => {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
        language: 'pt'
    };

    return client
        .analyzeSentiment({document})
        .then(([{documentSentiment}]) => ({
            score: documentSentiment.score,
            magnitude: documentSentiment.magnitude
        }));
}

Task((data) => {
    const text = data['text'];
    const normalizedText = data['normalized_text'];

    return getSentiment(text).then((sentiment) => {
        return getSentiment(normalizedText).then((nsentiment) => ({
            raw: sentiment,
            normalized: nsentiment
        }));
    });
});