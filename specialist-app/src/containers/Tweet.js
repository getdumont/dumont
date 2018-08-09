import React, { Component } from 'react';
import { addWord, removeWord } from 'domains/words/actions';
import { getTweet } from 'domains/lists/actions';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';
import { List } from 'immutable';

const mapStateToProps = ({ list, word }) => ({
    text: (list.get('detail') || {}).text,
    words: word.get('list') || new List(),
});

const mapDispatchToProps = (dispatch) => ({
    getTweet: () => dispatch(getTweet()),
    addWord: (text) => dispatch(addWord(text)),
    removeWord: (text) => dispatch(removeWord(text)),
})

export class TweetContainerComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.text || this.props.text === '') {
            this.props.getTweet();
        }
    }

    removePoints(text) {
        return text.replace(/!|\.|\:|,|;/g, '');
    }

    renderWords() {
        if (!this.props.text) {
            return null;
        }

        return this.props.text.split(" ").map((text, index) => {
            const word = this.removePoints(text);
            const itsOnList = this.props.words.contains(word);

            const style = itsOnList ? ({
                opacity: '0.5',
                background: '#f1f1f1',
                marginRight: '6px',
                cursor: 'pointer'
            }) : ({
                marginRight: '6px',
                cursor: 'pointer'
            });

            const onClick = itsOnList ?
                this.props.removeWord : this.props.addWord;

            return (
                <span key={`word-${index}`} style={style}
                    onClick={() => onClick(word)}>
                    {text}
                </span>
            );
        });
    }

    render() {
        return (
            <Card block>
                {this.renderWords()}
            </Card>
        );
    }
}

export const TweetContainer = connect(mapStateToProps, mapDispatchToProps)(TweetContainerComponent);

export default TweetContainer;