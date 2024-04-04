import React from "react";
import { Box, Typography } from "@mui/material";
import Question from "../../Components/Survey/Question";
import { useEffect, useState } from "react";
import { serverApi, token } from "../../confing/confing";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandeling, refreshToken } from "../../services";
const SurveyQuestion = () => {
  const { id } = useParams();
  const [info, setInfo] = useState("");
  const [list, setList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverApi}survey/${id}`);
        // console.log(data);
        setInfo(data.title);
        setList(data.multi_choice_questions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}survey/theQuestionAndTheAnswers/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(data);
        setAnswers(data);
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
        }}
      >
        <Typography fontWeight={600}>{info}</Typography>
      </Box>
      <Box
        mt={2}
        p={{ xs: 3, md: 5 }}
        sx={{ backgroundColor: "#fafafa", borderRadius: "8px" }}
      >
        {list.map((i, index) => (
          <Box key={index}>
           {
           !loading && <Question item={i} index={index} info={answers} />
           }
            <hr />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SurveyQuestion;
