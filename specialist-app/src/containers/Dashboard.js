import React from 'react';
import { DashboardLayout } from '@opensanca/burro-react';

const logo = 'https://getdumont.com/assets/images/logo.png';
const buttons = [
    {
        children: <i className=''>X</i>,
        onClick: () => false,
        id: 'logout',
    }
];

export const DashboardContainer = ({ children }) => (
    <DashboardLayout logo={logo} buttons={buttons}>
        {children}
    </DashboardLayout>
);

export default DashboardContainer;