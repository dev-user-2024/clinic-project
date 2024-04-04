import SidebarContainer from './sidebarContainer';
import SidebarContent from './sidebarContent';
import SidebarDrawer from './sidebarDrawer';
import './style.css';
import React from "react";
function Sidebar() {
  return (
    <div className='sidbar-box'>
    <SidebarContainer>
      <SidebarContent />
      <SidebarDrawer />
    </SidebarContainer>
    </div>
  );
}
export default Sidebar;

