import { Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SidebarLinks from './SidebarLinks';
import SidebarFooter from './SidebarFooter';
import React from "react";


function SidebarContent() {
  return (
    <Box sx={{
      justifyContent: 'center',
      overflowX: 'hidden',
      overflowY: 'auto',
      pt: 1,
    }}
    >
      <SidebarLinks />
      <SidebarFooter />

    </Box>
  );
}
export default SidebarContent;
