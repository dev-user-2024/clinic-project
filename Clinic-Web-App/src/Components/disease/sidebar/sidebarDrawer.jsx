import { useContext } from 'react';
import { Drawer } from '@mui/material';
import MainContext from "../../../context/index"
import SidebarContent from './sidebarContent';
import React from "react";

function SidebarDrawer() {
  const { drawerOpen, setDrawerOpen } = useContext(MainContext);
  return (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': {
          width: 300,
        },
        display: {
          xs: 'block',
          sm: 'block',
          md: 'none',
          lg: 'none',
          xl: 'none',
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}
export default SidebarDrawer;
