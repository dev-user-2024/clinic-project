import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import icon from "../../assests/image/svg/quiz-icon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Zoom from "react-reveal/Zoom";
import { errorHandeling, refreshToken } from "../../services";
const OldQuiz = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz/myQuizzes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if(data.length > 0){
          setList(data);
        }
        const { data: data2 } = await axios.get(
          `${serverApi}descriptiveQuiz/myQuizzes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       if(data2.length > 0){
        setList2(data2);
       }
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
        <Typography fontWeight={600}>آزمونهای قدیمی</Typography>
      </Box>
      <Box mt={3} display="flex">
        <label className="ms-2" style={{ width: "80px" }}>
          نوع آزمون
        </label>
        <select
          className="input-style"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={1}>آزمون های چند گزینه ای</option>
          <option value={2}>آزمون های ترکیبی</option>
        </select>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
        <Zoom bottom cascade>
          <div>
            {type == 1 &&
              list.map((i, index) => (
                <div className="card-hover2" key={index}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                      backgroundColor: "#fff",
                    }}
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    mt={2}
                  >
                    <Box display="flex">
                      <img alt="" width={30} src={icon} />
                      <Typography mx={2}>آزمون {i.title}</Typography>
                    </Box>
                    <Link to={`multiChoiceQuiz/${i.id}`}>
                      <Typography mx={2}>مشاهده نتایج</Typography>
                    </Link>
                    <ArrowBackRounded />
                  </Box>
                </div>
              ))}
          </div>
        </Zoom>
        <Zoom bottom cascade>
          <div>
            {type == 2 &&
              list2.map((i, index) => (
                <div className="card-hover2" key={index}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                      backgroundColor: "#fff",
                    }}
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    mt={2}
                  >
                    <Box display="flex">
                      <img alt="" width={30} src={icon} />
                      <Typography mx={2}>آزمون {i.title}</Typography>
                    </Box>
                    <Link to={`descriptiveQuiz/${i.id}`}>
                      <Typography mx={2}>مشاهده نتایج</Typography>
                    </Link>
                    <ArrowBackRounded />
                  </Box>
                </div>
              ))}
          </div>
        </Zoom>
      </Box>
    </Box>
  );
};

export default OldQuiz;
