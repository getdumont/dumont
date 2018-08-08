import React from 'react';
import { Grid, Row, Column, Dropdown, Input, Card, Button } from '@opensanca/burro-react';
import { removeAnswer, addAnswer, updateAnswer } from 'domains/answers/actions';
import { connect } from 'react-redux';
import { List } from 'immutable';

const AnswerForm = ({
    questions,
    answer,
    updateAnswer,
    removeAnswer
}) => (
    <Row style={{marginBottom: '20px'}}>
        <Column md={5}>
            {/* <Dropdown placeholder='Selecione uma Pergunta' options={questions}
                selected={answer.question} onClick={(option) => console.log(option)}/> */}
            <Input value={answer.question} id='valueok2'
                onChange={(e) => updateAnswer('label', e.target.value)}/>
        </Column>
        <Column md={5}>
            <Input value={answer.impact} id='valueok'
                onChange={(e) => updateAnswer('impact', parseInt(e.target.value))}/>
        </Column>
        <Column md={2}>
            <Button block kind='danger' onClick={removeAnswer}>Remover</Button>
        </Column>
    </Row>
);

const mapStateToProps = ({ answer }) => ({
    questions: (answer.get('questions') || new List()).toJS(),
    answers: answer.get('answers') || new List(),
});

const mapDispatchToProps = (dispatch, { tweetId }) => ({
    updateAnswer: (index, key, value) => dispatch(updateAnswer(index, key, value)),
    removeAnswer: (key) => dispatch(removeAnswer(key)),
    addAnswer: () => dispatch(addAnswer())
});

export const AnswerContainerComponent = ({
    questions,
    answers,
    removeAnswer,
    updateAnswer,
    addAnswer,
}) => (
    <Card block>
        <Grid>
            {
                answers.map((answer, index) => (
                    <AnswerForm answer={answer} questions={questions} key={index}
                        updateAnswer={(key, value) => updateAnswer(index, key, value)}
                        removeAnswer={() => removeAnswer(index)} />
                ))
            }
            <Row>
                <Column xs={12}>
                    <Button block kind='primary' onClick={addAnswer}>
                        Adicionar Resposta
                    </Button>
                </Column>
            </Row>
        </Grid>
    </Card>
);

export const AnswerContainer = connect(mapStateToProps, mapDispatchToProps)(AnswerContainerComponent);

export default AnswerContainer;