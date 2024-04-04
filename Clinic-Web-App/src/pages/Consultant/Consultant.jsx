import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
    ArrowBackRounded,
    Add
  } from "@mui/icons-material";
const Consultant = () => {
  return (
    <Box>
      <Box
        py={1.5}
        sx={{
          backgroundColor: "#EFF7FF",
          borderRadius: "50px",
          color: "#238BEB",
        }}
      >
        <Typography fontWeight={600}> مشاور</Typography>
      </Box>
      <Box mt={3}>
       <Link to='/new-request'>
       <Button sx={{backgroundColor:"#238BEB"}} variant="contained">
       <Add /> درخواست جدید
     </Button>
       </Link>
      </Box>
      <Box mt={1}>
      <Typography textAlign='left' fontWeight={600} color='#238BEB'>درخواست های در انتطار پاسخ</Typography>
      <Link to='1'>
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
          }}
          display="flex"
          justifyContent="space-between"
          p={2}
          mt={2}
        >
          <Box display="flex">
            <Typography>10 تیر 1402</Typography>
          </Box>
          <ArrowBackRounded />
        </Box>
      </Link>
    </Box>
    <Box mt={3}>
    <Typography textAlign='left' fontWeight={600} color='#238BEB'>درخواست های پاسخ داده شده</Typography>
    <Link to='1'>
      <Box
        sx={{
          borderRadius: "20px",
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
        }}
        display="flex"
        justifyContent="space-between"
        p={2}
        mt={2}
      >
        <Box display="flex">
          <Typography>10 تیر 1402</Typography>
        </Box>
        <ArrowBackRounded />
      </Box>
    </Link>
  </Box>
    </Box>
  );
};

export default Consultant;
