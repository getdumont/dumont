import React, { Component } from 'react';
import { Card } from '@opensanca/burro-react';
import { getTweet } from 'domains/lists/actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ list }) => {
    const tweet = list.get('detail') || {};

    return {
        text: tweet.text,
        created_at: tweet.created_at
    }
};

const mapDispatchToProps = (dispatch) => ({
    getTweet: () => dispatch(getTweet())
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
            <Card block>
                <p> { this.props.text } </p>
            </Card>
        );
    }
}

export const TweetContainer = connect(mapStateToProps, mapDispatchToProps)(TweetContainerComponent);

export default TweetContainer;