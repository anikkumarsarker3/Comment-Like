import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';

const MainLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;