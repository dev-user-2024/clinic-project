import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import activeTick from "../../assests/icons/activeTick.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, token } from "../../confing/confing.js";
import { Pagination } from '@mui/material';
import Zoom from "react-reveal/Zoom";
const NewSurvey = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${serverApi}survey?page=${pageNumber}`);
        setList(data.data);
        setLoading(false);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
      } catch (err) {
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
          border:"1px dashed #238BEB"
        }}
      >
        <Typography fontWeight={600}>نظر سنجی های جدید</Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
     <Zoom bottom cascade>
     <div>
     {
      list.map((i,index)=> (
       <div key={index} className="card-hover2">
       <Link to={`${i.id}`} >
       <Box
         sx={{
           borderRadius: "20px",
           boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
         }}
         display="flex"
         justifyContent="space-between"
         p={2}
         mt={2}
       >
         <Box display="flex">
           <img alt="" width={30} src={activeTick} />
           <Typography mx={2}>{i.title}</Typography>
         </Box>
         <ArrowBackRounded />
       </Box>
     </Link>
       </div>
      ))
    }
     </div>
     </Zoom>
      
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
      {pageTotal > 1 && (
        <Pagination
          count={pageTotal}
          onChange={(e, value) => {
            setPageNumber(value);
          }}
        />
      )}
    </Box>
    </Box>
  );
};

export default NewSurvey;
