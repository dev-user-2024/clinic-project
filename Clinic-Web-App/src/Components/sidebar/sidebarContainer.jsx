import Grid from '@mui/material/Unstable_Grid2';
import React from "react";

function SidebarContainer({ children }) {
  return (
    <Grid
      xs={0}
      sm={0}
      md={3}
      lg={2}
      xl={2}
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'block',
          lg: 'block',
          xl: 'block',
        },
      }}
    >
      {children}
    </Grid>
  );
}
export default SidebarContainer;
