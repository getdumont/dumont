const express = require('express');
const bodyParser = require('body-parser');
const App = express();

const {
    WordController,
    SpecialistController,
    AnswerController
} = require('./controller');

App.use(bodyParser.json());
App.use('/answers', AnswerController);
App.use('/words', WordController);
App.use('/specialists', SpecialistController);

App.listen(8081, '0.0.0.0', () => {
    console.log('Server up on 8081');
});