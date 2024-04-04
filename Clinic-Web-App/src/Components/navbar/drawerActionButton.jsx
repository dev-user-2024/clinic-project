import { Box, Fab } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import MainContext from "../../context/index";
import React from "react";

function DrawerActionButton() {
  const fTheme = useTheme();
  return (
    <Box
      aria-label="Sidebar"
      size="small"
      sx={{ m: 2, backgroundColor: fTheme.palette.grey.light }}
    >
      <MenuRounded color={fTheme.palette.grey.light} />
    </Box>
  );
}
export default DrawerActionButton;
