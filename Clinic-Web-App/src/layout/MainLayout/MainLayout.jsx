import React from "react";
import { Outlet } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../Components/sidebar/Sidebar";
import AppbarContainer from "../../Components/navbar/AppbarContainer";
const MainLayout = () => {
  return ( 
    <Grid container spacing={0} className='background'>
      <Grid item md={3} lg={2}>
        <Sidebar />
      </Grid>
      <Grid
        item
        overflow={{ Y: "scroll" }}
        xs={12}
        md={9}
        lg={10}
        sx={{ px: 2 }}
      >
        <AppbarContainer />
        <Box px={2} >
        <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
