import React from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, token } from "../../confing/confing";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
import Base64Downloader from "common-base64-downloader-react";
import { ticketSchema } from "../../validation";
import { errorHandeling, refreshToken } from "../../services";
const TicketDetails = () => {
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(data)
        setInfo(data);
        setList(data.messages);
        const { data: data2 } = await axios.get(`${serverApi}categoryTicket` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setList2(data2);
        setLoading(false);
      } catch (err) {
        console.log(err)
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
  const sendTicket = async (values, resetForm) => {
    try {
      // console.log(values);
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}message`,
        {
          content: values.content,
          ticket_id: id,
          file: values.file,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data2)
      toast.success("تیکت با موفقیت ارسال شد");
      setLoading(false);
    } catch (err) {
      console.log(err)
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          await sendTicket(values,resetForm);
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
    }
  };
  return (
    <Box>
      <Box
        py={1.5}
        sx={{
          backgroundColor: "#EFF7FF",
          borderRadius: "50px",
          color: "#238BEB",
          border:"1px dashed #238BEB"
        }}
      >
        <Typography fontWeight={600}>پشتیبانی</Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box p={{ xs: 2, md: 5 }}>
        <Formik
          initialValues={{
            title: info.title || "",
            category_ticket_id: info.category_ticket_id || "",
            file: "",
            content: "",
          }}
          validationSchema={ticketSchema}
          onSubmit={(values, { resetForm }) => {
            sendTicket(values, resetForm);
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
              <Box p={{ xs: 2, md: 5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" flexDirection="column" textAlign="left">
                      <label style={{ fontWeight: "300" }}>
                        موضوع را انتخاب کنید
                      </label>
                      <Field
                        as="select"
                        name="category_ticket_id"
                        className="profile-input-style"
                        disabled
                      >
                        <option>لطفا یک گزینه انتخاب کنید</option>
                        {list2.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.content}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category_ticket_id"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid textAlign="left" item xs={12} sm={4}>
                    <Box display="flex" flexDirection="column" textAlign="left">
                      <label style={{ fontWeight: "300" }}>عنوان</label>
                      <Field
                        name="title"
                        className="profile-input-style"
                        disabled
                      />
                      <ErrorMessage
                        name="title"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </Box>
                  </Grid>
                  {list.map((i, index) => (
                    <Grid item xs={12} key={index}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        textAlign="left"
                      >
                        <label style={{ fontWeight: "300" }}>
                          {i.user_id == userId ? "توضیحات" : "پاسخ"}
                        </label>
                        <Field
                          value={i.content}
                          as="textarea"
                          name="content1"
                          style={{
                            height: "200px",
                            resize: "none",
                            padding: "15px",
                          }}
                          className="profile-input-style"
                          disabled
                        />
                      </Box>
                      <Box mt={3} textAlign="left">
                        <Base64Downloader
                          base64={i.file}
                          downloadName="1x1_red_pixel"
                          Tag="a"
                          extraAttributes={{ href: "#" }}
                          className="my-class-name"
                          style={{
                            backgroundColor: "#238BEB",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "10px",
                          }}
                          // onDownloadSuccess={() => console.log('File download initiated')}
                          // onDownloadError={() => console.warn('Download failed to start')}
                        >
                          دانلود فایل مربوطه
                        </Base64Downloader>
                      </Box>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" textAlign="left">
                      <label style={{ fontWeight: "300" }}>توضیحات</label>
                      <Field
                        as="textarea"
                        name="content"
                        style={{
                          height: "200px",
                          resize: "none",
                          padding: "15px",
                        }}
                        className="profile-input-style"
                      />
                      <ErrorMessage
                        name="content"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" flexDirection="column" textAlign="left">
                      <label style={{ fontWeight: "300" }}>
                        فایل مرتبط را بارگذاری کنید
                      </label>
                      <Box mt={1} mx={3}>
                        <label htmlFor="upload_file">
                          <input
                            className="profile-input-style"
                            disabled
                            placeholder="فایل خود را بارگذاری کنید ..."
                            style={{backgroundColor:"#fff"}}
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
                            آپلود فایل
                          </Typography>
                        </label>
                        <input
                          type="file"
                          id="upload_file"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            handleFileSelect(e, setFieldValue, "file");
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid textAlign="left" item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#238BEB",
                        color: "#fff",
                        width: "250px",
                      }}
                    >
                      {loading ? "منتظر بمانید" : "ارسال مجدد درخواست"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default TicketDetails;
