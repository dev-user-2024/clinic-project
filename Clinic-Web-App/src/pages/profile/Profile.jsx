import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import camera from "../../assests/image/camera.png";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { errorHandeling, refreshToken } from "../../services";
const Profile = () => {
  const [info, setInfo] = useState({});
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await axios.post(
          `${serverApi}auth/whoAmI`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInfo(data.data);
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
            await fetchData();
          }
        } else {
          errorHandeling(err);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateProfile = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${serverApi}user/${info.id}`, values ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      toast.success("اطلاعات با موفقیت ویرایش شد");
      setLoading(false);
    } catch (err) {
      console.log(err)
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          await updateProfile(values);
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
    }
  };
  return (
    <Box p={{ xs: 1, md: 5 }}>
      <Box
        paddingX={{ xs: 1, md: 5 }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
      >
        <img alt="camera" src={camera} />
        <Box mx={3} mt={{ xs: 3, md: 0 }}>
          <label htmlFor="upload_file">
            <Typography
              px={4}
              py={1}
              variant="outlined"
              sx={{
                color: "#238BEB",
                border: "1px solid #238BEB",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              آپلود فایل
            </Typography>
          </label>
          <input type="file" id="upload_file" style={{ display: "none" }} />
        </Box>
      </Box>
      <Formik
        initialValues={{
          mobile: info.mobile || "",
          full_name: info.full_name || "",
          nationality_id: info.nationality_id || "",
          email: info.email || "",
          sex: info.sex || "female",
          birthDay: info.birthDay,
          approved: true,
        }}
        validationSchema={""}
        onSubmit={(values) => {
          updateProfile(values);
        }}
        enableReinitialize={true}
      >
        {({
          isSubmitting,
          errors,
          setFieldValue,
          touched,
          values,
          handleChange,
        }) => (
          <Form>
            <Box mt={3} px={{ xs: 0, md: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>
                      نام ونام خانوادگی
                    </label>
                    <Field name="full_name" className="profile-input-style" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>جنسیت</label>
                    <Field
                      as="select"
                      name="sex"
                      className="profile-input-style"
                    >
                      <option value="female">زن</option>
                      <option value="male">مرد</option>
                    </Field>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>تاریخ تولد</label>
                    <DatePicker
                      render={
                        <input
                          className="profile-input-style w-100"
                          style={{ width: "99%" }}
                        />
                      }
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      onChange={(e) => {
                        setFieldValue(
                          "birthDay",
                         `${ new Date(e).toISOString().split('T')[0]} 12:00:00` 
                        );
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>کد ملی</label>
                    <Field
                      name="nationality_id"
                      className="profile-input-style"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>شماره موبایل</label>
                    <Field
                      name="mobile"
                      className="profile-input-style"
                      disabled
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column" textAlign="left">
                    <label style={{ fontWeight: "300" }}>ایمیل</label>
                    <Field name="email" className="profile-input-style" />
                  </Box>
                </Grid>
                <Grid textAlign="left" item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#238BEB", color: "#fff" }}
                    type="submit"
                  >
                    ذخیره
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#238BEB",
                      color: "#238BEB",
                      mx: "10px",
                    }}
                  >
                    انصراف
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
