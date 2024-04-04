import React from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  ArrowBackRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import icon from "../../assests/image/svg/quiz-icon.svg"
import { useEffect , useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useParams } from "react-router-dom";
import Zoom from "react-reveal/Zoom";

const InfoList = () => {
  const {id} = useParams()
  const [list,setList] = useState([])
  const [info,setInfo] = useState("")
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${serverApi}informationCategory/${id}`);
        // console.log(data);
        setInfo(data.title)
        setList(data.information_items)
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
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
        <Typography fontWeight={600}>{info}</Typography>
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
        list.map((i,index)=>(
         <div className='card-hover2' key={index}>
         <Link to={`${i.id}`} >
         <Box
           sx={{
             borderRadius: "20px",
             boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
             backgroundColor:"#fff"
           }}
           display="flex"
           justifyContent="space-between"
           p={2}
           mt={2}
         >
           <Box display="flex">
           <img alt="" width={30} src={icon}/>
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
    </Box>
    );
};

export default InfoList;