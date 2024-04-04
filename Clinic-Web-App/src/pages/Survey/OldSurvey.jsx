import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import notActiveTick from "../../assests/icons/notActiveTick.png";
import axios from "axios";
import { serverApi, token } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import { errorHandeling, refreshToken } from "../../services";

const OldSurvey = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}survey/mySurveys`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false)
        setList(data);
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
        setLoading(false)
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
        <Typography fontWeight={600}>نظر سنجی های پیشین</Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
        <Zoom bottom cascade>
          <div>
            {list.map((i, index) => (
              <div key={index} className="card-hover2">
                <Link to={`${i.id}`}>
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
                    <Box display="flex">
                      <img alt="" width={30} src={notActiveTick} />
                      <Typography mx={2}>{i.title}</Typography>
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

export default OldSurvey;
