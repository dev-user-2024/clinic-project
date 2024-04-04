import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, token } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Base64Downloader from "common-base64-downloader-react";
import { errorHandeling, refreshToken } from "../../services/index.js";
const MultiChoiceResult = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz/myMark/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInfo(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
            await fetchData();
          }
        } else {
          errorHandeling(err);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box
        mt={3}
        p={2}
        textAlign="left"
        sx={{
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
          borderRadius: "15px",
          backgroundColor:"#fff"
        }}
      >
        <Typography>نمره آزمون : {info.totalScore}</Typography>
        {info?.answer?.length > 0 ? (
            <Box mt={3}>
              <Typography>توضیحات : {info.answer[0].content}</Typography>
              {info.answer[0].file && (
                <Box mt={3} mb={3}>
                  <Base64Downloader
                    base64={info.answer[0].file}
                    downloadName="1x1_red_pixel"
                    Tag="a"
                    extraAttributes={{ href: "#" }}
                    className="my-class-name"
                    style={{
                      backgroundColor: "#238BEB",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                    // onDownloadSuccess={() => console.log('File download initiated')}
                    // onDownloadError={() => console.warn('Download failed to start')}
                  >
                    دانلود فایل مربوطه
                  </Base64Downloader>
                </Box>
              )}
            </Box>
          ) : (
            <Box mt={3}>
            <Typography>برای این بازه از نمرات پاسخی ثبت نشده است.</Typography>
            </Box>
          )}
      </Box>
    </div>
  );
};

export default MultiChoiceResult;
