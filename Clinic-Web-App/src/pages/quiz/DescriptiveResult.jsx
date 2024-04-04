import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, token } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Base64Downloader from "common-base64-downloader-react";
import { errorHandeling, refreshToken } from "../../services/index.js";

const DescriptiveResult = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}descriptiveQuiz/myResult/${id}?user_id=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setList(data);
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
      {list.map((i, index) => (
        <Box
          key={index}
          mt={3}
          textAlign="left"
          p={2}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
          }}
        >
          <Typography fontWeight={700}>پاسخ {index + 1}</Typography>
          {i.pivot.content && (
            <Box mt={2} display="flex">
              <Typography>توضیحات:</Typography>
              <Typography>{i.pivot.content}</Typography>
            </Box>
          )}
          {i.pivot.file && (
            <Box mt={3} mb={3}>
              <Base64Downloader
                base64={i.pivot.file}
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
          {!i.pivot.file && !i.pivot.content && (
            <Box mt={3}>
              <Typography>هنوز پاسخی ثبت نشده است.</Typography>
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};

export default DescriptiveResult;
