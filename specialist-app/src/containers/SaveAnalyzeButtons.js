import React from 'react';
import { Button } from '@opensanca/burro-react';
import { finishTweetAnalyze } from 'domains/lists/actions';
import { connect } from 'react-redux';
import { List } from 'immutable';


const mapStateToProps = ({ answer, word, list }) => ({
    answers: answer.get('answers') || new List(),
    words: word.get('list') || new List(),
    tweetId: (list.get('detail') || {})._id
});

const mapDispatchToProps = (dispatch) => ({
    onClick: (...props) => dispatch(finishTweetAnalyze(...props)),
});

export const SaveAnalyzeButtonsComponent = ({ onClick, tweetId, answers, words }) => (
    <div>
        <Button onClick={onClick} kind='danger'>Dado sem Análise</Button>
        <Button onClick={() => onClick(tweetId, answers, words)}>Enviar Analise</Button>
    </div>
);

export const SaveAnalyzeButtons = connect(mapStateToProps, mapDispatchToProps)(SaveAnalyzeButtonsComponent);

export default SaveAnalyzeButtons;