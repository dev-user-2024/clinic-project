import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../assests/logo/logo.png"

const AboutUs = () => {
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
        <Typography fontWeight={600}>درباره ما</Typography>
      </Box>
      <Box mt={3} p={5}>
      <Box>
      <img width={150} alt="" src={logo}/>
      </Box>
        <Typography>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
