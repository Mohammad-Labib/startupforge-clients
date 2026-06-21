import { DashboardSidebar } from '@/components/Dashbosrd/DashboardSidebar';
import React from 'react';

const DasboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar></DashboardSidebar>
            <div>{children}</div>
        </div>
    );
};

export default DasboardLayout;