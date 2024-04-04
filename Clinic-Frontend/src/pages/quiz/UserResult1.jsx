import React from "react";
import { serverApi } from "../../confing/confing";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Question1 from "../../Components/quiz/Question1";
import { errorHandeling, refreshToken } from "../../services";
const UserResult1 = () => {
    const { id, userId } = useParams();
    const [list, setList] = useState({});
    const [qusList, setQusList] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          const token = localStorage.getItem("token");
          try {
            const { data } = await axios.get(
              `${serverApi}multiChoiceQuiz/${id}` ,
              { headers: { Authorization: `Bearer ${token}` } }
            );
           setQusList(data.multi_choice_questions)
           const { data :data2 } = await axios.get(
            `${serverApi}multiChoiceQuiz/theQuestionAndTheAnswersOfUser/${id}?user_id=${userId}`,
         
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setList(data2)
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
  
    return (
        <div>
        <div className="m-auto text-center">
        <PulseLoader
          color="#2c7f75"
          loading={loading}
          // cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
           {
           !loading && qusList.map((i,index)=>(
                <Question1 key={index} item={i} index={index} answer={list[i.id]}/>
            ))
           } 
        </div>
    );
};

export default UserResult1;