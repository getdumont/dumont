import React, { Component } from 'react';
import store from 'domains/store';

import { Grid, Row, Column } from '@opensanca/burro-react';
import { getTweet } from 'domains/lists/actions';
import { TweetContainer } from 'containers';

export class TweetAnalyzePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(getTweet());
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Column>
                        <TweetContainer />
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default TweetAnalyzePage;