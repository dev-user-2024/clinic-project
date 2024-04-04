import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

const RequestDetails = () => {
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
        <Typography fontWeight={600}>پشتیبانی</Typography>
      </Box>
      <Box p={{ xs: 2, md: 5 }}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" textAlign="left">
                <label style={{ fontWeight: "300" }}>
                  موضوع را انتخاب کنید
                </label>
                <select className="profile-input-style-disable" disabled>
                  <option>تحصیلی</option>
                  <option>مدد جویی</option>
                </select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" textAlign="left">
                <label style={{ fontWeight: "300" }}>
                  فایل مرتبط را بارگذاری کنید
                </label>
                <Box mt={1} mx={3}>
                  <label for="upload_file">
                    <input
                      className="profile-input-style-disable"
                      disabled
                      placeholder="فایل خود را بارگذاری کنید ..."
                    />
                    <Typography
                      px={4}
                      py={1}
                      variant="outlined"
                      sx={{
                        color: "#fff",
                        backgroundColor: "#238BEB",
                        border: "1px solid #238BEB",
                        borderRadius: "10px",
                        cursor: "pointer",
                        ml: "-15px",
                      }}
                      style={{ zIndex: 10 }}
                    >
                      مشاهده
                    </Typography>
                  </label>
                  <input
                    type="file"
                    disabled
                    id="upload_file"
                    style={{ display: "none" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" textAlign="left">
                <label style={{ fontWeight: "300" }}>توضیحات</label>
                <textarea
                  style={{ height: "150px", resize: "none" }}
                  disabled
                  className="profile-input-style-disable"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" textAlign="left">
                <label style={{ fontWeight: "300" }}>پاسخ</label>
                <textarea
                  style={{ height: "150px", resize: "none" }}
                  className="profile-input-style-disable"
                />
              </Box>
            </Grid>
            <Grid textAlign="left" item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#238BEB",
                  color: "#fff",
                  width: "250px",
                }}
              >
                ارسال  مجدد درخواست
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default RequestDetails;
