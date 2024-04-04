import React from "react";
import { Box, Typography, Button } from "@mui/material";
import logo from "../../assests/logo/logo.png"
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection='column'
      className='background'
    >
    <Box>
    <img width={150}  alt="" src={logo}/>
    <Typography fontWeight={600}>خوش آمدید</Typography>
    <Typography mt={1}>نحوه ورود را انتخاب کنید</Typography>
    </Box>
     <Box display='flex' flexDirection='column'>
    <Link to='/signup'>
    <Button variant="contained" sx={{backgroundColor:"#238BEB" , width:"250px" , mt:"30px"}}>ثبت نام می کنم</Button>
    </Link>
    <Link to='/user-signup'>
    <Button variant="outlined" sx={{borderColor:"#238BEB" ,color:"#238BEB", width:"250px" , mt:"10px"}}>از قبل پرونده پزشکی دارم</Button>
    </Link>
    <Link to='/'>
    <Button variant="outlined" sx={{borderColor:"#238BEB" ,color:"#238BEB", width:"250px" , mt:"10px"}}>الان ثبت نام نمی کنم</Button>
    </Link>
    <Link to='/user-login'>
    <Button variant="outlined" sx={{borderColor:"#238BEB" ,color:"#238BEB", width:"250px" , mt:"10px"}}>ورود</Button>
    </Link>
    </Box>
    </Box>
  );
};

export default Login;
