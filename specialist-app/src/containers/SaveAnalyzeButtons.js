import React from 'react';
import { Button } from '@opensanca/burro-react';
import { finishTweetAnalyze } from 'domains/lists/actions';
import { connect } from 'react-redux';
import { List } from 'immutable';


const mapStateToProps = ({ answer, list }) => ({
    answers: answer.get('answers') || new List(),
    tweetId: (list.get('detail') || {})._id
});

const mapDispatchToProps = (dispatch) => ({
    onClick: (...props) => dispatch(finishTweetAnalyze(...props)),
});

export const SaveAnalyzeButtonsComponent = ({ onClick, tweetId, answers }) => (
    <div>
        <Button onClick={onClick} kind='danger'>Dado sem Análise</Button>
        <Button onClick={() => onClick(tweetId, answers)}>Enviar Analise</Button>
    </div>
);

export const SaveAnalyzeButtons = connect(mapStateToProps, mapDispatchToProps)(SaveAnalyzeButtonsComponent);

export default SaveAnalyzeButtons;