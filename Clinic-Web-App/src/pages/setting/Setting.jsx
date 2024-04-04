import React from "react";
import { Box, Typography ,Grid, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { serverApi } from "../../confing/confing";
const Setting = () => {
  const setPass = async()=>{
    const pass = document.getElementById("password").value
    const pass2 = document.getElementById("password2").value
    const id = localStorage.getItem("id")
    console.log(id)
    if(pass){
      if(pass === pass2){
        const { data : data2 } = await axios.post(`${serverApi}user/setPassword/${id}`, {
          password : pass
         });
         console.log(data2)
         toast.success("پسورد با موفقیت ست شد")
      }else{
        toast.error("پسورد و تکرار آن برابر نیست")
      }
    }else{
      toast.error("لطفا پسورد را وارد کنید")
    }
  }
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
        <Typography fontWeight={600}>تنظیمات</Typography>
      </Box>
    {/*
    <Box textAlign="left" mt={2}>
        <Typography variant="h6" color="#1D9BF0" fontWeight={600}>
          تم برنامه
        </Typography>
        <FormControl sx={{ my: "20px" }}>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              sx={{ mr: { md: "50px" } }}
              value="female"
              control={<Radio />}
              label="حالت روز"
            />
            <FormControlLabel
              sx={{ mr: { md: "50px" } }}
              value="male"
              control={<Radio />}
              label="حالت شب"
            />
          </RadioGroup>
        </FormControl>
      </Box>
  */}
      <Box textAlign='left' mt={2}>
      <Typography variant="h6" color="#1D9BF0" fontWeight={600}>
        قرار دادن رمز عبور
      </Typography>
      <form>
    <Grid container spacing={3}>
    <Grid item xs={6} md={4} lg={3}>
    <Box display='flex' flexDirection='column' textAlign='left'>
    <label style={{fontWeight:"300"}}>رمز عبور</label>
    <input className="profile-input-style" id="password" />
    </Box>
    </Grid>
    <Grid item xs={6} md={4} lg={3}>
    <Box display='flex' flexDirection='column' textAlign='left'>
    <label style={{fontWeight:"300"}}>تکرار رمز عبور</label>
    <input className="profile-input-style" id="password2" />
    </Box>
    </Grid>
    <Grid textAlign='left' item xs={12}>
    <Button variant="contained" sx={{backgroundColor:"#238BEB" , color:"#fff"}} onClick={()=>{setPass()}}>ذخیره</Button>
    <Button variant="outlined" sx={{borderColor:"#238BEB" , color:"#238BEB" , mx:"10px"}}>انصراف</Button>
    </Grid>
    </Grid>

    </form>
    </Box>
    </Box>
  );
};

export default Setting;
