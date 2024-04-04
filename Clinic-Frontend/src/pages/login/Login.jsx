import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
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
    <div className="login-page">
      <div className="login-box">
        <h4 className="mb-4" style={{ fontWeight: "900" }}>
          پنل ادمین{" "}
        </h4>
        <input
          id="mobile"
          className="form-control w-100 mb-4"
          placeholder="نام کاربری"
        />
        <input
          id="pass"
          type="password"
          className="form-control w-100 mb-4"
          placeholder="رمز عبور"
        />
        <button
          className="add-btn btn"
          onClick={() => {
            login();
          }}
        >
          {loading ? "منتظر بمانید" : "ورود"}
        </button>
        <p className="mb-0">
          <small>فراموشی رمز عبور</small>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
