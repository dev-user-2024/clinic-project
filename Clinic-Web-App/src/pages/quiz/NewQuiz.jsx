import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import icon from "../../assests/image/svg/quiz-icon.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
const NewQuiz = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  let [loading, setLoading] = useState(true);
  const [pageTotal1, setPageTotl1] = useState(0);
  const [pageTotal2, setPageTotl2] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz?page=${pageNumber}`
        );
        setList(data.data)
        const { data: data2 } = await axios.get(
          `${serverApi}descriptiveQuiz?page=${pageNumber}`
        );
        setList2(data2.data);
        setLoading(false);
        const page1 = Math.ceil(data.total / data.per_page);
        const page2 = Math.ceil(data2.total / data.per_page);
        setPageTotl1(page1);
        setPageTotl2(page2);
      } catch (err) {
        toast.error("خطایی رخ داده است مجددا تلاش کنید");
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

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
        <Typography fontWeight={600}>آزمون های جدید</Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
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
      <Box mt={3}>
        <Grid container spacing={2}>
          {type == 1 &&
            list.map((i, index) => (
              <Grid item xs={6} lg={4} key={index} className="card-hover4">
                <Link to={`/quiz-info/1/${i.id}`}>
                  <Box
                    sx={{
                      boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
                      borderRadius: "25px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        height: "60px",
                        backgroundColor: "#238BEB26",
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                      }}
                      className="qiz-box-1"
                      pt={1}
                    >
                      <img alt="" src={icon} />
                    </Box>
                    <Box py={3} className="qiz-box-2">
                      <Typography>{i.title}</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          {type == 2 &&
            list2.map((i, index) => (
              <Grid item xs={6} lg={4} key={index} className="card-hover4">
              <Link to={`/quiz-info/2/${i.id}`}>
                <Box
                  sx={{
                    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
                    borderRadius: "25px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      height: "60px",
                      backgroundColor: "#238BEB26",
                      borderTopLeftRadius: "25px",
                      borderTopRightRadius: "25px",
                    }}
                    className="qiz-box-1"
                    pt={1}
                  >
                    <img alt="" src={icon} />
                  </Box>
                  <Box py={3} className="qiz-box-2">
                    <Typography>{i.title}</Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
            ))}
        </Grid>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        {type == 1 && pageTotal1 > 1 && (
          <Pagination
            count={pageTotal1}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
        {type == 2 && pageTotal2 > 1 && (
          <Pagination
            count={pageTotal2}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default NewQuiz;
