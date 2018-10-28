import React, { Component } from 'react';
import { addWord, removeWord } from 'domains/words/actions';
import { getTweet } from 'domains/lists/actions';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';
import { List } from 'immutable';

const mapStateToProps = ({ list, word }) => ({
    text: (list.get('detail') || {}).text,
    id: (list.get('detail') || {})._id,
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

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card block>
                    { this.props.id }
                </Card>
                <Card block>
                    {this.props.text}
                </Card>
            </div>
        );
    }
}

export const TweetContainer = connect(mapStateToProps, mapDispatchToProps)(TweetContainerComponent);

export default TweetContainer;