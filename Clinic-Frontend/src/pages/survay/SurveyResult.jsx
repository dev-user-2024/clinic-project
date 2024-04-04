import React from 'react';
import { serverApi } from '../../confing/confing';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PulseLoader } from "react-spinners";
import { errorHandeling, refreshToken } from '../../services';

const SurveyResult = () => {
    const { id } = useParams();
    const [list,setList] = useState([])
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
              `${serverApi}survey/${id}` ,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            setList(data.users)
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
      <div className='mt-3'>
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
           list.map((i,index)=>(
             <div className="col-12 mb-3 item-box px-3" key={index}>
             <strong style={{width:"150px"}}> آیدی : {i.id}</strong>
             <strong style={{width:"150px"}}> نام: {i.full_name || "-"}</strong>
             <strong style={{width:"150px"}}> موبایل{i.mobile|| "-"}</strong>
             <Link to={`${i.id}`}>مشاهده پاسخ ها</Link>
           </div>
           ))
         }
      </div>
    );
};

export default SurveyResult;