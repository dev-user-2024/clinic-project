import React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Base64Downloader from "common-base64-downloader-react";
const DescriptiveQuestion = ({ item, index, setAnswer, answers }) => {
  const answer = { content: "", file: "" };
  const [quesAnswer, setQuesAnswer] = useState({ content: "", file: "" });

  useEffect(() => {
    let x = answers.find((i) => i.id === item.id);
    if (x) {
      answer.content = x.pivot.content;
      answer.file = x.pivot.file;
      setAnswer(answer);
      setQuesAnswer(answer);
    }
  }, []);
  function handleFileSelect(event, setFieldValue, fileName) {
    const selectedFile = event.target.files[0];
    readFileAsBase64(selectedFile, setFieldValue, fileName);
  }
  function readFileAsBase64(file, setFieldValue, fileName) {
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;
      let copy = { ...quesAnswer };
      copy.file = base64String;
      setAnswer(copy);
    };

    reader.readAsDataURL(file);
  }
  return (
    <Box mt={3} textAlign="left">
      <Typography>
        {index + 1}-{item.content}
      </Typography>
      <Typography sx={{ mt: 2 }}>پاسخ</Typography>
      <textarea
        style={{
          border: "1px solid #238BEB",
          resize: "none",
          height: "200px",
          width: "100%",
          marginTop: "20px",
          borderRadius: "20px",
          padding: "15px",
        }}
        defaultValue={quesAnswer.content}
        onBlur={(e) => {
          let copy = { ...quesAnswer };
          copy.content = e.target.value;
          setAnswer(copy);
        }}
      />
      <Box mt={4} mb={4}>
        {quesAnswer.file && (
          <Base64Downloader
            base64={quesAnswer.file}
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
        )}
      </Box>
      <Box mt={1} mx={3}>
        <label htmlFor="upload_file">
          <input
            className="profile-input-style"
            disabled
            placeholder="فایل خود را بارگذاری کنید ..."
          />
          <Typography
            px={4}
            py={1}
            variant="outlined"
            sx={{
              color: "#fff",
              backgroundColor: "#238BEB",
              border: "1px solid #238BEB",
              borderRadius: "10px",
              cursor: "pointer",
              ml: "-15px",
            }}
            style={{ zIndex: 10 }}
          >
            آپلود فایل
          </Typography>
        </label>
        <input
          type="file"
          id="upload_file"
          style={{ display: "none" }}
          onChange={(e) => {
            handleFileSelect(e);
          }}
        />
      </Box>
    </Box>
  );
};

export default DescriptiveQuestion;
