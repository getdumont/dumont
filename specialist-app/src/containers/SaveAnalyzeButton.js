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
    onClick: (tweetId, answers) => dispatch(finishTweetAnalyze(tweetId, answers))
});

export const SaveAnalyzeButtonComponent = ({ onClick, tweetId, answers }) => (
    <Button onClick={() => onClick(tweetId, answers)}>Enviar Analise</Button>
);

export const SaveAnalyzeButton = connect(mapStateToProps, mapDispatchToProps)(SaveAnalyzeButtonComponent);

export default SaveAnalyzeButton;