import React from 'react';
import SidebarMenu from '../Components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import "./style.css"
const MainLayout = () => {
    return (
        <div className='w-100 text-end d-flex'>
            <SidebarMenu/>
            <div className='p-4 pe-2 w-100'>
            <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;