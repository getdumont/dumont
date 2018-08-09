import React from 'react';
import { removeWord } from 'domains/words/actions';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';

const mapStateToProps = ({ word }) => ({
    words: word.get('list') || new List(),
});

const mapDispatchToProps = (dispatch) => ({
    getTweet: () => dispatch(getTweet()),
    removeWord: (text) => dispatch(removeWord(text)),
})

const wordStyle = {
    background: '#005999',
    color: '#FFF',
    padding: '3px 7px',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer'
};

const renderWords = (words, onClick) => words.size === 0 ?
    'Adicione palavras clicando nelas no tweet' :
    words.map((word, index) => (
        <span key={`wlabel-${index}`} style={wordStyle} onClick={() => onClick(word)}>
            {word}
        </span>
    ));

export const WordContainerComponent = ({words, removeWord}) => (
    <Card block>
        <h3>Palavras Chaves</h3>
        <p style={{fontSize: '12px'}}>
            Aqui ficaram armazenadas palavras que pode ajudar a filtra e identificar futuras postagens com dimensões afetivas negativas. 
        </p>
        <hr />
        { renderWords(words, removeWord) }
    </Card>
);

export const WordContainer = connect(mapStateToProps, mapDispatchToProps)(WordContainerComponent);

export default WordContainer;