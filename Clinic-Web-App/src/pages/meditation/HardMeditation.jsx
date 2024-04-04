import React from "react";
import { Box, Typography, CircularProgress, Pagination  } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import "./style.css";
import { Link } from "react-router-dom";
import icon from "../../assests/image/svg/Mask group.svg";
import { useEffect , useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import Zoom from "react-reveal/Zoom";
const HardMeditation = () => {
  const [list,setList] = useState([])
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverApi}meditation/getByType/ADVANCE?page=${pageNumber}`);
       if(data.length > 0){
        setList(data);
      }
       const page = Math.ceil(data.total / data.per_page);
       setPageTotl(page);
       setLoading(false);
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageNumber]);
  return (
    <Box>
      <Box py={2.5} className="meditation-header-box">
        <Typography fontWeight={600}>
          ” یک فرد، تنها پس از التزام به تمرین در طولانی مدت و بدون انقطاع و با
          وفاداری به شدت در آن پایدار می‌شود.” «یوگا سوترا»
        </Typography>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
      <Zoom bottom cascade>
      <div className="card-hover2">
      {
        list.map((i,index)=>(
         <div key={index}>
         <Link to={`${i.id}`} >
         <Box
           sx={{
             borderRadius: "20px",
             boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
             backgroundColor:"#fff"
           }}
           display="flex"
           justifyContent="space-between"
           alignItems='center'
           p={2}
           mt={2}
         >
           <Box display="flex" alignItems="center">
             <img alt="" src={icon} />
             <Typography fontSize={{ xs: "small", md: "medium" }}>
               {index+1} - {i.title}
             </Typography>
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

export default HardMeditation;
