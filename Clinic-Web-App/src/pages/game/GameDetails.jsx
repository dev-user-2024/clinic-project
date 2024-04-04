import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import game from "../../assests/image/game.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useParams } from "react-router-dom";
const GameDetails = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // console.log(id)
      try {
        const { data } = await axios.get(`${serverApi}entertainment/${id}`);
        // console.log(data);
        setInfo(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Box mt={2}>
      <Box
        py={1.5}
        sx={{
          backgroundColor: "#EFF7FF",
          borderRadius: "50px",
          color: "#238BEB",
          border:"1px dashed #238BEB"
        }}
      >
        <Typography fontWeight={600}>{info.title}</Typography>
      </Box>
      <Box mt={3} className="meditation-header-box" pb={0} height={100}>
        <img alt="" height="100%" width='100%' style={{borderRadius:"20px"}} src={info.image} />
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
        <Typography textAlign="left" mb={2} fontWeight={600}>
          توضیحات
        </Typography>
        <Typography textAlign="justify">{info.description}</Typography>
      </Box>
      <Box mt={5}>
        <a href={info.Bazar_link} target="_blank">
          <Button
            size="large"
            sx={{ backgroundColor: "#238BEB", color: "#fff", width: "200px" }}
          >
            ورود از طریق بازار
          </Button>
        </a>
      </Box>
      <Box mt={2}>
        <a href={info.app_store_link} target="_blank">
          <Button
            size="large"
            sx={{ backgroundColor: "#238BEB", color: "#fff", width: "200px" }}
          >
            ورود از طریق اپ استور
          </Button>
        </a>
      </Box>
      <Box mt={2}>
        <a href={info.play_store_link} target="_blank">
          <Button
            size="large"
            sx={{ backgroundColor: "#238BEB", color: "#fff", width: "200px" }}
          >
            ورود از طریق اپ استور
          </Button>
        </a>
      </Box>
    </Box>
  );
};

export default GameDetails;
