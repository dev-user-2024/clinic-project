import React from "react";
import { Box, Typography, Grid ,CircularProgress } from "@mui/material";
import 'video-react/dist/video-react.css'; // import css
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import Base64Downloader from 'common-base64-downloader-react';
const SkillDetails = () => {
  const {id} = useParams()
  const [info,setInfo] = useState({})
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${serverApi}item/${id}`);
        setInfo(data)
        setLoading(false)
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
      { !loading &&
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
        <Typography fontWeight={600}>{info.title}</Typography>
      </Box>
        <Box mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <Box mt={3}>
                <Typography textAlign='left' mb={2} fontWeight={600}>توضیحات</Typography>
                <Typography textAlign='left' sx={{textAlign:"justify" , wordBreak:"break-word"}}>
                 {info.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12} mt={4}>
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
          </Grid>
        </Box>
        </Box>
      }
      </Box>
    );
};

export default SkillDetails;