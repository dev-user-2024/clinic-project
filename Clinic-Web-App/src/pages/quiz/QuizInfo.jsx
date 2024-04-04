import React from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import {
  AssignmentOutlined,
  ChecklistOutlined,
  AccessTimeOutlined,
  BorderColorOutlined,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const QuizInfo = () => {
  const { id, type } = useParams();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type == 1) {
          const { data } = await axios.get(`${serverApi}multiChoiceQuiz/${id}`);
          setInfo(data);
        } else {
          const { data } = await axios.get(`${serverApi}descriptiveQuiz/${id}`);
          setInfo(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("خطایی رخ داده است مجددا تلاش کنید");
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
        <Typography fontWeight={600}>اطلاعات آزمون</Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <Box>
          <Grid mt={2} container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box display="flex">
                <Typography fontWeight={700} display="flex" alignItems="center">
                  <AssignmentOutlined />
                  عنوان:
                </Typography>
                <Typography sx={{ ml: 1 }}>{info.title}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box display="flex">
                <Typography fontWeight={700} display="flex" alignItems="center">
                  <ChecklistOutlined />
                  تعداد سوال :
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {info.multi_choice_questions?.length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box display="flex">
                <Typography fontWeight={700} display="flex" alignItems="center">
                  <BorderColorOutlined />
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {type === 1 ? "تستی" : "ترکیبی(تستی و تشریحی)"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button
              variant="contained"
              sx={{ width: "200px" }}
              onClick={() => {
                type == 1
                  ? navigate("/multiple-choice-test", { state: { info, type } })
                  : navigate("/descriptive-test", { state: { info, type } });
              }}
            >
              شروع آزمون
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizInfo;
