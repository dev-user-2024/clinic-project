import React from "react";
import { Box, Typography } from "@mui/material";
import {
  PersonOutlineOutlined,
  CalendarMonthOutlined,
  WatchLaterOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useParams } from "react-router-dom";
import { errorHandeling, refreshToken } from "../../services";
const VisitDetails = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}faceToFaceVisit/${id}` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        // console.log(data);
        setInfo(data);
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
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Box
        py={1.5}
        sx={{
          backgroundColor: "#EFF7FF",
          borderRadius: "50px",
          color: "#238BEB",
        }}
      >
        <Typography fontWeight={600}>نوبت های من</Typography>
      </Box>
      <Box
        p={3}
        mt={2}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
          backgroundColor: "#fff",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          border="1px solid #238BEB"
          borderRadius="20px"
          p={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box display="flex">
            <Typography color="#238BEB">
              <PersonOutlineOutlined />
            </Typography>
            <Typography>{info.full_name}</Typography>
          </Box>
          <Box display="flex">
            <Typography color="#238BEB">
              <CalendarMonthOutlined />
            </Typography>
            <Typography>
              {info.visit &&
                Intl.DateTimeFormat("fa-IR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(info.visit))}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography color="#238BEB">
              <WatchLaterOutlined />
            </Typography>
            <Typography>
              {info.visit &&
                Intl.DateTimeFormat("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(info.visit))}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography mt={3} color="#238BEB" textAlign="left">
            توضیحات:
          </Typography>
          <Typography mt={2} mb={10} p={1} textAlign="justify">
            ندارد
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default VisitDetails;
