import React from 'react';
import { Grid, Row, Column, Dropdown, RadioBox, Card, Button } from '@opensanca/burro-react';
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
        <Column md={6}>
            <Dropdown placeholder='Selecione uma Pergunta' options={questions}
                selected={answer.label} onClick={(option) => updateAnswer('label', option)}/>
        </Column>
        <Column md={4}>
            <RadioBox selected={answer.impact} value='1' label='1' onChange={(e) => updateAnswer('impact', e.target.value)} />
            <RadioBox selected={answer.impact} value='2' label='2' onChange={(e) => updateAnswer('impact', e.target.value)} />
            <RadioBox selected={answer.impact} value='3' label='3' onChange={(e) => updateAnswer('impact', e.target.value)} />
            <RadioBox selected={answer.impact} value='4' label='4' onChange={(e) => updateAnswer('impact', e.target.value)} />
        </Column>
        <Column md={2}>
            <Button block kind='danger' onClick={removeAnswer}>X</Button>
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
        <h3> Resposta </h3>
        <p style={{fontSize: '12px'}}>
            Nessa sessão é possível adicionar respostas baseadas na Escala de Ansiedade, Depressão e Estresse. Basta clicar no botão 'Adicionar Resposta', selecionar a pergunta e a intensidade na qual ela se enquadra.
        </p>
        <hr/>
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