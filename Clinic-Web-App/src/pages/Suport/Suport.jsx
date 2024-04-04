import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackRounded, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, token } from "../../confing/confing";
import { toast } from "react-toastify";
import Zoom from "react-reveal/Zoom";
import { errorHandeling, refreshToken } from "../../services";

const Suport = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const { data } = await axios.get(`${serverApi}ticket/inProgress`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // if(data.length > 0){
        //   setList(data);
        // }
        const token = localStorage.getItem("token");
        const { data: data2 } = await axios.get(
          `${serverApi}ticket/myTickets`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data2.length > 0) {
          setList2(data2);
        }
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
  return (
    <Box>
      <Box
        py={1.5}
        sx={{
          backgroundColor: "#EFF7FF",
          borderRadius: "50px",
          color: "#238BEB",
          border: "1px dashed #238BEB",
        }}
      >
        <Typography fontWeight={600}> پشتیبانی</Typography>
      </Box>
      <Box mt={3}>
        <Link to="/new-ticket">
          <Button sx={{ backgroundColor: "#238BEB" }} variant="contained">
            <Add /> درخواست جدید
          </Button>
        </Link>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {/*
       <Box mt={2}>
        <Typography textAlign="left" fontWeight={600} color="#238BEB">
          درخواست های در انتطار پاسخ
        </Typography>
        {list.map((i, index) => (
          <Link to={`/ticket/${i.id}`} key={index}>
            <Box
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
              }}
              display="flex"
              justifyContent="space-between"
              p={2}
              mt={2}
            >
              <Typography>{i.title}</Typography>
              <Box display="flex">
                <Typography>
                  {Intl.DateTimeFormat("fa-IR").format(new Date(i.created_at))}
                </Typography>
              </Box>
              <ArrowBackRounded />
            </Box>
          </Link>
        ))}
      </Box>
      */}
      <Box mt={3} mb={2}>
        <Typography textAlign="left" fontWeight={600} color="#238BEB">
          درخواست های من
        </Typography>
        <Zoom bottom cascade>
          <div>
            {list2.map((i, index) => (
              <div key={index} className="card-hover2">
                <Link to={`/ticket/${i.id}`}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                    }}
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    mt={2}
                  >
                    <Typography>{i.title}</Typography>
                    <Box display="flex">
                      <Typography>
                        {Intl.DateTimeFormat("fa-IR").format(
                          new Date(i.created_at)
                        )}
                      </Typography>
                    </Box>
                    <ArrowBackRounded />
                  </Box>
                </Link>
              </div>
            ))}
          </div>
        </Zoom>
      </Box>
    </Box>
  );
};

export default Suport;
