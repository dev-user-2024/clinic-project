import React from "react";
import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import icon from "../../assests/image/svg/quiz-icon.svg";
import { Link } from "react-router-dom";
const Quizes = ({ list1, list2 }) => {
  const [type, setType] = useState(1);

  return (
    <div>
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
            list1.map((i, index) => (
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
        {type == 1 && list1.length === 0 && (
          <Typography>موردی یافت نشد</Typography>
        )}
        {type == 2 && list2.length === 0 && (
          <Typography>موردی یافت نشد</Typography>
        )}
      </Box>
    </div>
  );
};

export default Quizes;
