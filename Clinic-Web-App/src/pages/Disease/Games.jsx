import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
const Games = ({ list }) => {
  return (
    <div>
      <Grid container mt={3} spacing={3}>
        {list.map((i, index) => (
          <Grid item xs={6} sm={4} lg={3} key={index}>
            <Link to={`/game/${i.id}`}>
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
                    backgroundColor: "#238BEB",
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
      {list.length === 0 && <Typography>موردی یافت نشد</Typography>}
    </div>
  );
};

export default Games;
