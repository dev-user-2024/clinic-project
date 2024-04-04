import SidebarContainer from './sidebarContainer';
import SidebarContent from './sidebarContent';
import SidebarDrawer from './sidebarDrawer';
import './style.css';
import React from "react";
function Sidebar({tab}) {
  return (
    <div className='sidbar-box2'>
    <SidebarContainer>
      <SidebarContent />
      <SidebarDrawer />
    </SidebarContainer>
    </div>
  );
}
export default Sidebar;

