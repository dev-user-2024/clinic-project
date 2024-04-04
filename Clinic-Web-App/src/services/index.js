import axios from "axios";
import { serverApi } from "../confing/confing";
import { toast } from "react-toastify";

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${serverApi}auth/refresh`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data)
    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    console.log(err);
    toast.error("خطایی رخ داده است مجددا تلاش کنید");
    let status = err?.response?.status;
    if (status === 401 || status === 400) {
      window.location.pathname = "/login";
      localStorage.clear()
    }
    return false;
  }
};

export const errorHandeling = async (err) => {
  let status = err?.response?.status;
  if (status === 403) {
    toast.error(" شما دسترسی به این بخش ندارید");
  } else if (status === 400) {
    let obj = err.response.data.errors;
    // console.log(obj)
    for (const key in obj) {
      const value = obj[key][0];
      toast.error(value);
    }
  } else {
    toast.error("خطایی رخ داده است مجدد تلاش کنید");
  }
};
