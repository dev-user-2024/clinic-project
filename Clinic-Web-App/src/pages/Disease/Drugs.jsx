import React from 'react';
import Zoom from "react-reveal/Zoom";
import { Box , Typography } from '@mui/material';
const Drugs = ({list}) => {
    return (
        <Box mt={3}>
        <Zoom>
          <div>
            {list.map((i, index) => (
              <div className="card-hover2" key={index}>
                <Box
                  sx={{
                    borderRadius: "15px",
                    boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                    backgroundColor:"#fff"
                  }}
                  display="flex"
                  justifyContent="space-between"
                  p={2}
                  mt={2}
                >
                  <Typography color="#238BEB">{i.name}</Typography>
                </Box>
              </div>
            ))}
            {
                list.length === 0 && <Typography>موردی یافت نشد</Typography>
            }
          </div>
        </Zoom>
      </Box>
    );
};

export default Drugs;