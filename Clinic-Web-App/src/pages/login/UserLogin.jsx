import React from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import logo from "../../assests/logo/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoadnig] = useState();
  const login = async () => {
    try {
      const mobile = document.getElementById("mobile").value;
      const password = document.getElementById("pass").value;
      if (mobile && password) {
        setLoadnig(true);
        const { data } = await axios.post(
          `${serverApi}auth/loginWithPassword`,
          { mobile, password }
        );
        localStorage.setItem("token", data.token);
        navigate("/");
        setLoadnig(false);
        const { data: data2 } = await axios.post(
          `${serverApi}auth/whoAmI`,
          {},
          {
            headers: { Authorization: `Bearer ${data.token}` },
          }
        );
        localStorage.setItem("id", data2.id);
      } else {
        toast.error("لطفا شماره موبایل و کد ملی خود را وارد کنید");
      }
    } catch (err) {
      console.log(err);
      setLoadnig(false);
      toast.error(`${err?.response?.data?.error}`);
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
        <Typography fontWeight={600}>ورود</Typography>
      </Box>
      <Box>
        <Box mt={5}>
          <Typography textAlign="left">شماره موبایل</Typography>
          <input
            id="mobile"
            style={{ width: "280px" }}
            className="profile-input-style"
          />
        </Box>
        <Box mt={1}>
          <Typography textAlign="left">کد ملی</Typography>
          <input
            id="pass"
            style={{ width: "280px" }}
            className="profile-input-style"
          />
        </Box>
        <Box mt={1} textAlign="left">
          <FormControlLabel control={<Checkbox />} label="مرا به خاطر بسپار" />
        </Box>
        <Box mt={5}>
          <Button
            sx={{ width: "280px" }}
            variant="contained"
            onClick={() => {
              login();
            }}
          >
            {loading ? "منتظر بمانید" : "ورود"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserLogin;
