const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const App = express();

const {
    SpecialistController,
    AnswerController,
    ListController
} = require('./controller');

App.use(cors());
App.use(bodyParser.json());
App.use('/answers', AnswerController);
App.use('/specialists', SpecialistController);
App.use('/lists', ListController);

App.listen(8081, '0.0.0.0', () => {
    console.log('Server up on 8081');
});