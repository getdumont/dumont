import React, { Component } from 'react';
import { getTweet } from 'domains/lists/actions';
import { Card } from '@opensanca/burro-react';
import { connect } from 'react-redux';

const mapStateToProps = ({ list }) => ({
    text: (list.get('detail') || {}).text,
    id: (list.get('detail') || {})._id,
});

const mapDispatchToProps = (dispatch) => ({
    getTweet: () => dispatch(getTweet()),
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