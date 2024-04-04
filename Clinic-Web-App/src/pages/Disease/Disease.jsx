import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import "../style.css";
import Sidebar from "../../Components/disease/sidebar/Sidebar";
import AppbarContainer from "../../Components/navbar/AppbarContainer";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import MainContext from "../../context/index";
import Drugs from "./Drugs";
import Games from "./Games";
import Quizes from "./Quizes";
import Skills from "./Skills";
import Info from "./Info";
import Meditations from "./Meditations";

const Disease = () => {
  const [loading, setLoading] = useState(false);
  const { tab } = useContext(MainContext);
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [drugList, setDrugList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [quisList1, setQuizList1] = useState([]);
  const [quizList2, setQuizList2] = useState([]);
  const [skilsList, setSkillsList] = useState([]);
  const [infoList, setInfoList] = useState([]);
  const [meditationList, setMeditationList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverApi}disease/${id}`);
        console.log(data);
        setInfo(data);
        setDrugList(data.drugs);
        setGameList(data.entertainments);
        setQuizList1(data.multi_choice_quizzez);
        setQuizList2(data.descriptive_quizzes);
        setSkillsList(data.category_life_skills);
        setInfoList(data.information_category);
        setMeditationList(data.meditations)
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("خطایی رخ داده است مجدد تلاش کنید");
      }
    };
    fetchData();
  }, []);
  return (
    <Box className="background" minHeight="100vh">
      <Grid container spacing={0} minHeight={{ md: "100vh" }}>
        <Grid
          item
          md={3}
          lg={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          pl={3}
        >
          <Sidebar />
        </Grid>
        <Grid item overflow={{ Y: "scroll" }} xs={12} md={9} lg={10}>
          <AppbarContainer />
          <Box px={3}>
            <Box
              py={1.5}
              sx={{
                backgroundColor: "#EFF7FF",
                borderRadius: "50px",
                color: "#238BEB",
                border: "1px dashed #238BEB",
              }}
            >
              <Typography fontWeight={600}>{info.name}</Typography>
            </Box>
          </Box>
          {loading && (
            <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          <Box px={3} mt={3}>
            {tab === 1 ? (
              <Drugs list={drugList} />
            ) : tab === 2 ? (
              <Games list={gameList} />
            ) : tab === 3 ? (
              <Quizes list1={quisList1} list2={quizList2} />
            ) : tab === 4 ? (
              <Skills list={skilsList}/>
            ) : tab === 5 ? (
              <Info list={infoList} />
            ) : tab === 6 ? (
              <Meditations list={meditationList}/>
            ) : ""}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Disease;
