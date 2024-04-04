import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MultipleChoiceQuestion from "../../Components/quiz/MultipleChoiceQuestion";
import DescriptiveQuestion from "../../Components/quiz/DescriptiveQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  serverApi } from "../../confing/confing";
import axios from "axios";
import { errorHandeling, refreshToken } from "../../services";
const Quiz1 = () => {
  const [indexShow, setIndexShow] = useState(0);
  const { state } = useLocation();
  const [list, setList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answer2, setAnswer2] = useState({ content: "", file: "" });
  const [info, setInfo] = useState({});
  const [info2, setInfo2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigat = useNavigate("/");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let arry = [];
        state.info.descriptive_questions.map((i) => {
          let x = {
            type: 2,
            content: i.content,
            id: i.id,
          };
          arry.push(x);
        });
        state.info.multi_choice_questions.map((i) => {
          let x = {
            type: 1,
            content: i.content,
            status: true,
            choices: i.choices,
            id: i.id,
          };
          arry.push(x);
        });
        setList(arry);
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
          `${serverApi}descriptiveQuiz/theQuestionAndTheAnswers/${state.info.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(data);
        setInfo2(data.descriptive);
        setInfo(data.multi_choice);
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

  const sendAnswer = async (item) => {
    try {
      setLoading2(true);
      if (item.type == 1) {
        if (answer) {
          const token = localStorage.getItem("token");
          const { data } = await axios.post(
            `${serverApi}choice/pickAnAnswer/${answer}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log(data)
          setAnswer("");
          let qusId = data.multi_choice_question_id;
          let copy = { ...info };
          copy[qusId] = [data];
          setInfo(copy);
          setIndexShow(indexShow + 1);
        } else {
          toast.error("لطفا یک پاسخ وارد انتخاب کنید");
        }
      } else {
        if (answer2.content || answer2.file) {
          const token = localStorage.getItem("token");
          const { data } = await axios.post(
            `${serverApi}descriptiveQuestion/storeAnswer/${item.id}`,
            answer2,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log(data)
          let copy = [...info2];
          const itemIndex = copy.findIndex((i) => i.id == item.id);
          copy[itemIndex] = { ...data };
          setInfo2(copy);
          setAnswer2({ content: "", file: "" });
          setIndexShow(indexShow + 1);
        } else {
          toast.error("لطفا یک گزینه انتخاب کنید");
        }
      }
      setLoading2(false);
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          await sendAnswer(item);
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
              <Box width="90%">
                {!loading && i.type === 2 ? (
                  <DescriptiveQuestion
                    item={i}
                    index={index}
                    setAnswer={setAnswer2}
                    answers={info2}
                  />
                ) : !loading && i.type === 1 ? (
                  <MultipleChoiceQuestion
                    item={i}
                    index={index}
                    setAnswer={setAnswer}
                    answer={info[i.id]}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                {index !== list.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      sendAnswer(i);
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

export default Quiz1;
