import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
const InformationCategory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverApi}informationCategory`);
        console.log(data);
        if (data.length > 0) {
          setList(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
        <Grid container spacing={3}>
          {list.map((i, index) => (
            <Grid item xs={6} sm={4} lg={3} key={index}>
              <Link to={`${i.id}`}>
                <Box
                  sx={{
                    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
                    backgroundColor: "#fff",
                    borderRadius: "25px",
                  }}
                  className="card-hover3"
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "80px",
                      borderTopLeftRadius: "25px",
                      borderTopRightRadius: "25px",
                      overflow: "hidden",
                    }}
                    className="card-hover3"
                  >
                    <img
                      width="100%"
                      height="100%"
                      style={{
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                        objectFit:"contain"
                      }}
                      alt=""
                      src={i.image}
                    />
                  </Box>
                  <Box py={3}>
                    <Typography>{i.title}</Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InformationCategory;
