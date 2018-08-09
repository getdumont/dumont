import React from 'react';
import { DashboardLayout } from '@opensanca/burro-react';
import { connect } from 'react-redux';
import { destroySession } from 'domains/specialists/actions';

const mapDispatchToProps = (dispatch) => ({
    destroySession: () => dispatch(destroySession())
});

export const DashboardContainerComponent = ({ children, destroySession }) => {
    const logo = 'https://getdumont.com/assets/images/logo.png';
    const buttons = [{
        children: <i className=''>X</i>,
        onClick: destroySession,
        id: 'logout',
    }];

    return (
        <DashboardLayout logo={logo} buttons={buttons}>
            {children}
        </DashboardLayout>
    )
};

export const DashboardContainer = connect(() => ({}), mapDispatchToProps)(DashboardContainerComponent);
export default DashboardContainer;