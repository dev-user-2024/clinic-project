import React from 'react';
import { Box, Typography, IconButton , Button } from "@mui/material";
import { WhatsApp , LinkedIn , Instagram , Twitter } from '@mui/icons-material';
const ContactUs = () => {
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
          <Typography fontWeight={600}>ارتباط با ما</Typography>
        </Box>
        <Box mt={3}>
        نقشه
        </Box>
        <Box p={3} mt={3} sx={{backgroundColor:"#EFF7FF"}}>
        <Box mt={2}>
        <Typography fontWeight={800} color='#238BEB'>وب سایت</Typography>
        <Typography fontWeight={600}>www.farahosh.com</Typography>
        </Box>
        <Box mt={2}>
        <Typography fontWeight={800} color='#238BEB'>ایمیل</Typography>
        <Typography fontWeight={600}>farahosh@gmail.com</Typography>
        </Box>
        <Box mt={2}>
        <Typography fontWeight={800} color='#238BEB'>شماره تماس</Typography>
        <Typography fontWeight={600}>0933-222-3333</Typography>
        </Box>
        <Box mt={2}>
        <Typography fontWeight={800} color='#238BEB'>آدرس</Typography>
        <Typography fontWeight={600}>تهران ولیعصر</Typography>
        </Box>
        </Box>
        <Box mt={3} mx='auto' display='flex' justifyContent='center'>
        <IconButton  sx={{mx:"5px", backgroundColor:"#238BEB" , color:"#fff" , borderRadius:"0"}}>
        <LinkedIn/>
        </IconButton>
        <IconButton  sx={{mx:"5px", backgroundColor:"#238BEB" , color:"#fff" , borderRadius:"0"}}>
        <Instagram/>
        </IconButton>
        <IconButton  sx={{mx:"5px", backgroundColor:"#238BEB" , color:"#fff" , borderRadius:"0"}}>
        <Twitter/>
        </IconButton>
        <IconButton  sx={{mx:"5px", backgroundColor:"#238BEB" , color:"#fff" , borderRadius:"0"}}>
        <WhatsApp/>
        </IconButton>
        </Box>
      </Box>
    );
};

export default ContactUs;