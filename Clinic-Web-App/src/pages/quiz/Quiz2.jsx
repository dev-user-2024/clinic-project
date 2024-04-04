import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MultipleChoiceQuestion from "../../Components/quiz/MultipleChoiceQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverApi } from "../../confing/confing";
import axios from "axios";
import {refreshToken , errorHandeling} from "../../services/index"
const Quiz2 = () => {
  const [indexShow, setIndexShow] = useState(0);
  const { state } = useLocation();
  const [list, setList] = useState(state.info.multi_choice_questions || []);
  const [answer, setAnswer] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigat = useNavigate("/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz/theQuestionAndThePickedChoices/${state.info.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(data);
        setInfo(data);
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
  const sendAnswer = async () => {
    try {
      if (answer) {
        setLoading2(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.post(
          `${serverApi}choice/pickAnAnswer/${answer}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnswer("");
        let qusId = data.multi_choice_question_id;
        let copy = { ...info };
        copy[qusId] = [data];
        setInfo(copy);
        setIndexShow(indexShow + 1);
        setLoading2(false);
      } else {
        toast.error("لطفا یک گزینه انتخاب کنید");
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          await sendAnswer();
        }
      } else {
        errorHandeling(err);
      }
      setLoading2(false);
    }
  };

  return (
    <Box>
      {list.map(
        (i, index) =>
          indexShow === index && (
            <Box key={index}>
              <Box
                p={2}
                sx={{
                  backgroundColor: "rgba(35, 139, 235, 0.15)",
                  mx: "auto",
                  borderRadius: "15px",
                }}
                width={100}
              >
                <Typography>
                  سوال {index + 1} از {list.length}
                </Typography>
              </Box>
              <Box>
                {!loading && (
                  <MultipleChoiceQuestion
                    item={i}
                    index={index}
                    setAnswer={setAnswer}
                    answer={info[i.id]}
                  />
                )}
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                {index !== list.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      sendAnswer();
                    }}
                  >
                    {loading2 ? "منتظر بمانید" : "سوال بعدی"}
                  </Button>
                )}
                {index !== 0 && (
                  <Button
                    variant="outlined"
                    sx={{ ml: 2, mr: 2 }}
                    onClick={() => {
                      setIndexShow(indexShow - 1);
                    }}
                  >
                    سوال قبلی
                  </Button>
                )}
                {index === list.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      sendAnswer(i);
                      toast.success("ازمون با موفقیت ثبت شد");
                      navigat("/new-quiz");
                    }}
                  >
                    پایان ازمون
                  </Button>
                )}
              </Box>
            </Box>
          )
      )}
    </Box>
  );
};

export default Quiz2;
