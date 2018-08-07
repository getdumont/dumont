import React from 'react';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';

const mapStateToProps = ({ list }) => {
    const tweet = list.get('detail') || {};

    return {
        text: tweet.text,
        created_at: tweet.created_at
    }
};

export const TweetContainerComponent = ({
    text,
    created_at
}) => (
    <Card>
        <p> { text } </p>
        <p> { created_at } </p>
    </Card>
);

export const TweetContainer = connect(mapStateToProps)(TweetContainerComponent);

export default TweetContainer;