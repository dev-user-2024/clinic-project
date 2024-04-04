import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useEffect } from "react";
import logo from "../../assests/logo/logo.png";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignUp1 = () => {
  const [type, setType] = useState(1);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [loading, setLoadnig] = useState();
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate()

  // کاهش زمان تایمر هر ثانیه
  useEffect(() => {
    let intervalId;

    if (isTimerActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive, timer]);

  // بررسی زمان تمام شدن تایمر
  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
      // انجام اقدامات مربوط به تمام شدن زمان تایمر
    }
  }, [timer]);

  const SendMobile = async () => {
    try {
      const mobile = document.getElementById("mobile").value;
      if (mobile) {
        setLoadnig(true);
        const { data } = await axios.post(`${serverApi}auth/preLogin`, {
          mobile,
        });
        console.log(data);
        toast.success("کد برای شما ارسال شد");
        setMobile(mobile);
        setType(2);
        setLoadnig(false);
      } else {
        toast.error("لطفا شماره موبایل  خود را وارد کنید");
      }
    } catch (err) {
      console.log(err);
      setLoadnig(false);
      toast.error(`${err.response.data.error}`);
    }
  };
  const SendOtpCode = async () => {
    const password = document.getElementById("pass").value;
    try {
      if (otp && password) {
        setLoadnig(true);
        const { data } = await axios.post(`${serverApi}auth/mobileCheck`, {
          mobile,otp
        });
        console.log(data)
        const { data : data2 } = await axios.post(`${serverApi}user/setPassword/${data.data.id}`, {
         password
        });
        // console.log(data2)
        toast.success("حساب کاربری با موفقیت ساخته شد میتوانید از قسمت ورود، وارد سایت شوید")
        navigate("/user-login")
        setLoadnig(false);
      } else {
        toast.error("لطفا کد ارسال شده و کد ملی را وارد کنید");
      }
    } catch (err) {
      console.log(err);
      setLoadnig(false);
      toast.error(`${err.response.data.error}`);
    }
  };
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className='background'
    >
      <Box>
        <img width={150} alt="" src={logo} />
      </Box>
      {type === 1 ? (
        <Box>
          <Typography>
            برای ورود یا ثبت نام شماره موبایل خود را وارد کنید
          </Typography>
          <Box mt={5}>
            <input
              id="mobile"
              style={{ width: "280px" }}
              className="profile-input-style"
            />
          </Box>
          <Box mt={5}>
            <Button
              sx={{ width: "280px" }}
              variant="contained"
              onClick={() => {
                SendMobile();
              }}
            >
              {loading ? "منتظر بمانید" : "ورود"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography>کد تایید برای شماره موبایل {mobile} ارسال شد.</Typography>
          <Box
            mt={5}
            pt={1}
            sx={{ width: "320px" }}
            className="profile-input-style"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              containerStyle={{ direction: "ltr" }}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{ border: "none", width: "70px", textAlign: "center" }}
                />
              )}
            />
            
          </Box>
          <Box mt={1}>
          <Typography textAlign='left'>کد ملی</Typography>
            <input id='pass' style={{ width: "320px" }} className="profile-input-style" />
          </Box>
          {isTimerActive ? (
            <Typography mt={4} color="#222526" variant="caption">
              ارسال مجدد کد تا {timer} دیگر
            </Typography>
          ) : (
            <Button sx={{ color: "#238BEB" }}>ارسال مجدد کد</Button>
          )}
          <Box mt={5}>
            <Button
              sx={{ width: "280px" }}
              variant="contained"
              onClick={() => {
                SendOtpCode();
              }}
            >
              {
                loading ? "منتظر بمانید" : "تایید"
              }
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SignUp1;
