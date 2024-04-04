import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import 'video-react/dist/video-react.css'; // import css
import { useEffect , useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useParams } from "react-router-dom";
import Base64Downloader from 'common-base64-downloader-react';
const MeditationDetails = () => {
  const {id} = useParams()
  const [info,setInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverApi}meditation/${id}`);
        setInfo(data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box py={2.5} className="meditation-header-box">
        <Typography fontWeight={600}>
            {info.title}
        </Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Box mt={3}>
              <Typography textAlign='left' mb={2} fontWeight={600}>توضیحات</Typography>
              <Typography textAlign='justify'>
                {info.description}                
              </Typography>
            </Box>
          </Grid>
          <Base64Downloader
          base64={info.file}
          downloadName="1x1_red_pixel"
          Tag="a"
          extraAttributes={{ href: '#' }}
          className="my-class-name"
          style={{ backgroundColor:"#238BEB" , color:"#fff" ,padding:"10px 20px" ,borderRadius:"10px" }}
          // onDownloadSuccess={() => console.log('File download initiated')}
          // onDownloadError={() => console.warn('Download failed to start')}
      >
          دانلود فایل مربوطه
      </Base64Downloader>
        </Grid>
      </Box>
    </Box>
  );
};

export default MeditationDetails;
