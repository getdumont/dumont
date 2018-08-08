import React from 'react';

import { Grid, Row, Column } from '@opensanca/burro-react';
import { TweetContainer, WordContainer, AnswerContainer, SaveAnalyzeButton } from 'containers';

export const  TweetAnalyzePage = () => (
    <Grid>
        <Row style={{marginTop: '10px'}}>
            <Column xs={12}>
                <TweetContainer />
            </Column>
        </Row>
        <Row style={{marginTop: '20px'}}>
            <Column md={4}>
                <WordContainer />
            </Column>
            <Column md={8}>
                <AnswerContainer />
            </Column>
        </Row>
        <Row style={{marginTop: '20px'}}>
            <Column justifyContent='flex-end'>
                <SaveAnalyzeButton />
            </Column>
        </Row>
    </Grid>
);

export default TweetAnalyzePage;