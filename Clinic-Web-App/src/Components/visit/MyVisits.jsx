import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  CheckCircleOutlineRounded,
  ArrowBackRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import Zoom from "react-reveal/Zoom";
import { errorHandeling, refreshToken } from "../../services";
const MyVisit = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const data = await axios.post(
          `${serverApi}auth/whoAmI`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setList(data.data.requests_of_patients);
        setLoading(false);
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
        <Typography fontWeight={600}>نوبت های من</Typography>
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
              <div key={index}>
                <Link to={`/my-visit/${i.id}`} className="card-hover2">
                  <Box
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                      backgroundColor: "#fff",
                    }}
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    py={3}
                    mt={2}
                  >
                    <Box display="flex">
                      <CheckCircleOutlineRounded />
                      <Typography>
                        {Intl.DateTimeFormat("fa-IR", {
                          day: "2-digit",
                          month: "long",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(i.visit))}
                      </Typography>
                    </Box>
                    <ArrowBackRounded />
                  </Box>
                </Link>
              </div>
            ))}
            {list.length === 0 && <Typography>نوبتی یافت نشد</Typography>}
          </div>
        </Zoom>
      </Box>
    </Box>
  );
};

export default MyVisit;
