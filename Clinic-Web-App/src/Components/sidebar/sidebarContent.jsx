import { Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarLinks from './SidebarLinks';
import SidebarFooter from './SidebarFooter';
import MainContext from '../../context/index';
import React from "react";


function SidebarContent() {
  const { mode } = useContext(MainContext);
  const fTheme = useTheme();
  const fPalette = fTheme.palette;
  return (
    <Box sx={{
      justifyContent: 'left',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      pt: 1,
      backgroundColor: mode === 'dark' ? fPalette.grey.dark : '#FFFFFF',
    }}
    >
      <SidebarHeader />
      <SidebarLinks />
      <SidebarFooter />

    </Box>
  );
}
export default SidebarContent;
