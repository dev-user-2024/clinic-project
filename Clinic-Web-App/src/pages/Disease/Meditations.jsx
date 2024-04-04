import React from "react";
import { Box, Typography } from "@mui/material";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";
import { ArrowBackRounded } from "@mui/icons-material";
import icon from "../../assests/image/svg/Mask group2.svg";
const Meditations = ({ list }) => {
  return (
    <div>
      <Box>
        <Zoom bottom cascade>
          <div>
            {list.map((i, index) => (
              <div className="card-hover2" key={index}>
                <Link to={`/meditation/${i.id}`}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                      backgroundColor: "#fff",
                    }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    mt={2}
                  >
                    <Box display="flex" alignItems="center">
                      <img alt="" src={icon} />
                      <Typography fontSize={{ xs: "small", md: "medium" }}>
                        {index + 1} - {i.title}
                      </Typography>
                    </Box>
                    <Typography>
                      {i.type === "BEGINNER" ? "مبتدی" : "پیشرفته"}
                    </Typography>
                    <ArrowBackRounded />
                  </Box>
                </Link>
              </div>
            ))}
            {list.length === 0 && <Typography>موردی یافت نشد</Typography>}
          </div>
        </Zoom>
      </Box>
    </div>
  );
};

export default Meditations;
