import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import logo from "../../assests/logo/logo.png"
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { serverApi} from '../../confing/confing';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignUp = () => {
  const navigate = useNavigate()
  const [loading , setLoadnig] = useState()
  const senduser = async()=>{
    try{
      const full_name = document.getElementById("name").value
      const mobile = document.getElementById("mobile").value
      const nationality_id = document.getElementById("nationality_id").value
      if(mobile && full_name && nationality_id){
        setLoadnig(true)
        const { data } = await axios.post(
          `${serverApi}potentialUser`, {full_name,mobile , nationality_id}
        );
        console.log(data)
        toast.success("درخواست شما با موفقیت ارسال شد، منتظر تماس باشید")
        setLoadnig(false)
      }else{
        toast.error("لطفا اطلاعات را به طور کامل وارد کنید وارد کنید")
      }
    }catch(err){
      console.log(err)
      setLoadnig(false)
      toast.error(`${err.response.data.error}`)
    }

  }
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
      <Typography fontWeight={600}>ثبت نام</Typography>
      </Box>
      <Box>
      <Box mt={4}>
      <Typography textAlign='left'>نام و نام خانوادگی</Typography>
        <input id='name' style={{ width: "280px" }} className="profile-input-style" />
      </Box>
      <Box mt={1}>
      <Typography textAlign='left'>شماره موبایل</Typography>
        <input id='mobile' style={{ width: "280px" }} className="profile-input-style" />
      </Box>
      <Box mt={1}>
      <Typography textAlign='left'>کد ملی</Typography>
        <input id='nationality_id' style={{ width: "280px" }} className="profile-input-style" />
      </Box>
      <Box mt={5}>
        <Button
          sx={{ width: "280px" }}
          variant="contained"
          onClick={()=>{senduser()}}
        >
          {
            loading ? "منتظر بمانید" : "ارسال درخواست"
          }
        </Button>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
      <Typography>حساب کاربری دارید؟</Typography>
      <Link to='/user-login' style={{fontSize:"small", color:"#238BEB"}}>وارد شوید</Link>
      </Box>
    </Box>
      </Box>
    );
};

export default SignUp;