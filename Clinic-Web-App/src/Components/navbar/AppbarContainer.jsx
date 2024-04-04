import Grid from "@mui/material/Unstable_Grid2";
import PrimarySearchAppBar from "./Appbar";
import "./style.css"
import React from "react";

function AppbarContainer() {
  return (
    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
      <PrimarySearchAppBar
        sx={{
          '&.muirtl-11ouz13-MuiPaper-root-MuiAppBar-root': {
            color: 'text.primary',
          },
        }}
      />
    </Grid>
  );
}
export default AppbarContainer;
