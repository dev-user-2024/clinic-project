import React from "react";
import { useEffect, useState } from "react";
import Base64Downloader from "common-base64-downloader-react";
const Question2 = ({ item, index, answer }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    let x = answer.find((i) => i.id === item.id);
    if (x) {
      let answer = {};
      answer.content = x.pivot.content;
      answer.file = x.pivot.file;
      setInfo(answer);
    }
  }, []);
  return (
    <div className="mt-5">
      <p>
        {index + 1}-{item.content}
      </p>
      <p>پاسخ: </p>
      {info.content && (
        <textarea
          className="w-100"
          value={info.content}
          disabled
          style={{
            background: "none",
            resize: "none",
            minHeight: "120px",
            borderRadius: "20px",
            padding: "10px",
          }}
        />
      )}
     <div className="mt-2">
     {info.file && (
        <Base64Downloader
          base64={info.file}
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
     </div>
    </div>
  );
};

export default Question2;
