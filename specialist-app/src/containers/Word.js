import React from 'react';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';

const mapStateToProps = ({ list }) => {
    return {}
};

export const WordContainerComponent = () => (
    <Card block>
        Word
    </Card>
);

export const WordContainer = connect(mapStateToProps)(WordContainerComponent);

export default WordContainer;