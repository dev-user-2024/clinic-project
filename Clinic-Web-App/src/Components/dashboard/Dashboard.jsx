import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import note from "../../assests/icons/note.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import surveyIcon from "../../assests/image/Mask group (2).png";
import supportIcon from "../../assests/image/Mask group.png";
import doctorIcon from "../../assests/image/Mask group (1).png";
const Dashboard = () => {
  const [diseaseList, setDiseaseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverApi}disease`);
        // console.log(data);
        if (data.length > 0) {
          setDiseaseList(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Box mb={2}>
      <Grid container spacing={{ xs: 2, lg: 4 }}>
        <Grid item xs={12} sm={4} >
          <Box
            sx={{
              height: "150px",
            }}
            p={3}
            className="box-style"
            textAlign="left"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography mb={4} fontWeight={700} color='#238BEB'>
                خدمات پر کاربرد
              </Typography>
              {
                /*
                   <Link to="/consultant"  className="text-hover">
                <Typography mb={4} color="#949494">
                  مشاوره آنلاین
                </Typography>
              </Link>
                */
              }
              <Link to="/consultant"  className="text-hover">
                <Typography mb={4} color="#949494">
                  پشتیبانی
                </Typography>
              </Link>
            </Box>
            <Box textAlign="right" display={{ xs: "none", md: "block" }}>
              <img width={120} alt="" src={supportIcon} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} >
          <Box p={3} sx={{ height: "150px" }} className="box-style">
            <Box display="flex">
              <img alt="note" width={20} src={note} />
              <Typography px={1} color='#238BEB'>یاداشت</Typography>
            </Box>
            <textarea
              style={{
                width: "100%",
                border: "none",
                height: "120px",
                resize: "none",
                padding: "10px",
              }}
              className="note-back"
            ></textarea>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Box
            sx={{
              height: "150px",
            }}
            p={3}
            className="box-style"
            textAlign="left"
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography mb={2} fontWeight={700} color='#238BEB'>
                دانشمندان
              </Typography>
              <Link to="/my-visit"  className="text-hover">
                <Typography mb={2} color="#949494">
                  نوبت های من
                </Typography>
              </Link>
              <Link to="/contact-us"  className="text-hover">
                <Typography mb={2} color="#949494">
                  ارتباط با ما
                </Typography>
              </Link>
              <Link to="/about-us"  className="text-hover">
                <Typography mb={2} color="#949494"  className="text-hover">
                  درباره ما
                </Typography>
              </Link>
            </Box>
            <Box textAlign="right" display={{ xs: "none", md: "block" }}>
              <img width={120} alt="" src={doctorIcon} />
            </Box>
          </Box>
          <Box
            sx={{
              height: "150px",
            }}
            p={3}
            className="box-style"
            textAlign="left"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography mb={2} fontWeight={700} color='#238BEB'>
                نظر سنجی
              </Typography>
              <Link to="/new-survey"  className="text-hover">
                <Typography mb={2} color="#949494">
                  نظر سنجی جدید
                </Typography>
              </Link>
              <Link to="/old-survey"  className="text-hover">
                <Typography mb={2} color="#949494">
                  نظر سنجی پیشین
                </Typography>
              </Link>
            </Box>
            <Box textAlign="right" display={{ xs: "none", md: "block" }}>
              <img width={100} alt="" src={surveyIcon} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}  className="">
          <Box p={3} mb={2} height="90%" className="box-style">
            <Box
              p={1}
              sx={{
                backgroundColor: "rgba(35, 139, 235, 0.10)",
                borderRight: "5px",
                color:"#000",
                borderRadius:"5px"
              }}
            >
              <Typography fontWeight={900}>
                بیماری مورد نظر خود را انتخاب کنید
              </Typography>
            </Box>
            <Box>
              <Zoom top cascade>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                  }}
                >
                  {diseaseList.map((i, index) => (
                    <Box
                      sx={{
                        cursor: "pointer",
                        backgroundColor:"#fff",
                        border:"0.5px solid #238BEB",
                        borderRadius:"5px"
                      }}
                      flex="0 0 calc(50% - 20px)"
                      boxSizing="border-box"
                      borderRadius={0}
                      key={index}
                      margin="10px"
                      mb={2}
                      className="card-hover"
                    >
                    {
                      <Link to={`disease/${i.id}`}>
                      <Button
                      sx={{
                        width: "100%",
                        height: "100%",
                        py: 1,
                        color:"#000"
                      }}
                    >
                      {i.name}
                    </Button>
                      </Link>
                    }
                    </Box>
                  ))}
                </div>
              </Zoom>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
