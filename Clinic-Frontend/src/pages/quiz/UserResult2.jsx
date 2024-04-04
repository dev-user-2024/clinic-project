import React from "react";
import { serverApi } from "../../confing/confing";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Question1 from "../../Components/quiz/Question1";
import Question2 from "../../Components/quiz/Question2";
import { toast } from "react-toastify";
import { errorHandeling, refreshToken } from "../../services";

const UserResult2 = () => {
  const { id, userId } = useParams();
  const [quslist, setQusList] = useState([]);
  const [quslist2, setQusList2] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [answerList2, setAnswerList2] = useState([]);
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  let [loading, setLoading] = useState(true);
  let [loading2, setLoading2] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}descriptiveQuiz/${id}` ,
        { headers: { Authorization: `Bearer ${token}` } }

        );
        setQusList(data.descriptive_questions);
        setQusList2(data.multi_choice_questions);
        const { data : data2 } = await axios.get(
          `${serverApi}descriptiveQuiz/theQuestionAndTheAnswersOfUser/${id}?user_id=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnswerList(data2.descriptive);
        setAnswerList2(data2.multi_choice);
        setLoading(false)
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
           await fetchData()
          }
        } else {
          errorHandeling(err);
        }
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  function handleFileSelect(event) {
    const selectedFile = event.target.files[0];
    readFileAsBase64(selectedFile);
  }

  function readFileAsBase64(file) {
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;
      setFile(base64String);
    };

    reader.readAsDataURL(file);
  }
  const sendDes = async () => {
    try {
      setLoading2(true)
    if(file || desc){
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}descriptiveQuiz/addUserResult/${id}`,
        {
          user_id: userId,
          content: desc,
          file: file,
        } ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data)
      setLoading2(false)
      toast.success("پاسخ با موفقیت ثبت شد")
      setDesc("")
      setFile("")
    }else{
      toast.error("لطفا یک متن یا یک وارد کنید")
    }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await sendDes()
        }
      } else {
        errorHandeling(err);
      }
      setLoading2(false)
    }
  };
  return (
    <div>
      <div className="m-auto text-center mb-4">
        <PulseLoader
          color="#2c7f75"
          loading={loading}
          // cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      {!loading &&
        quslist.map((i, index) => (
          <Question2 key={index} item={i} index={index} answer={answerList} />
        ))}
      {!loading &&
        quslist2.map((i, index) => (
          <Question1
            key={index}
            item={i}
            index={index}
            answer={answerList2[i.id]}
          />
        ))}
      <div className="mt-3">
        <strong>ارسال پاسخ برای کاربر</strong>
        <p className="mt-2">توضیحات</p>
        <textarea
          className="w-100"
          style={{
            background: "none",
            resize: "none",
            minHeight: "160px",
            borderRadius: "20px",
            padding: "10px",
          }}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <div className="mb-2  col-lg-3  ">
          <label
            style={{ width: "250px", height: "50px" }}
            htmlFor="upload_file"
            className="add-btn btn"
          >
            <span>آپلود فایل مربوطه</span>
          </label>
          <input
            type="file"
            id="upload_file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleFileSelect(e);
            }}
          />
        </div>
        <div className="mb-2 mx-auto col-lg-3">
          <button type="submit" className="add-btn btn mt-3" onClick={()=>{sendDes()}}>
            { loading2 ? "لطفا منتظر بمانید" : "ثبت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserResult2;
