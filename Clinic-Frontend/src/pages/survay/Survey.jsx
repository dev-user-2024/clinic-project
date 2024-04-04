import React from 'react';
import { FaPen, FaTrash } from "react-icons/fa";
import SurveyModal from './SurveyModal';
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from '@mui/material';
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from 'react-router-dom';
import { errorHandeling, refreshToken } from '../../services';
const Survey = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${serverApi}survey?page=${pageNumber}`);
        console.log(data.data);
        setList(data.data);
        setLoading(false);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  
  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف نظر سنجی",
      text: "ایا از حذف این نظر سنجی مطمین هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        removeListener(id);
      }
    });
  };

  const removeListener = async (id) => {
    const allItem = [...list];
    try {
      const token = localStorage.getItem("token");
      setList(list.filter((item) => item.id !== id));
      const { data } = await axios.delete(`${serverApi}survey/${id}` , 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      console.log(data);
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
    } catch (err) {
      Swal.close();
      console.log(err);
      setList(allItem);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          removeListener(id)
        }
      } else {
        errorHandeling(err);
      }
    }
  };
    return (
        <div>
      <div className="row p-2">
        <button
          className="add-btn btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ width: "250px", height: "50px" }}
        >
          ساخت نظر سنجی جدید
        </button>
        <SurveyModal/>
      </div>
      <div className="m-auto text-center mt-4">
      <PulseLoader
        color="#2c7f75"
        loading={loading}
        // cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
      <div className="row mt-4">
        <h6 style={{ color: "#828282" }}>لیست نظر سنجی</h6>
        {
          list.map((i,index)=>(
            <div className="col-12 mb-3 item-box" key={index}>
            <strong style={{width:"150px"}}>{i.title}</strong>
            <Link to={`/survey/result/${i.id}`}>مشاهده نتایج</Link>
            <div className="d-flex flex-column flex-md-row">
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={() => {
                  confirmDelete(i.id);
                }}
              >
                <FaTrash />
              </button>
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={()=>{navigate(`/add-survey/${i.id}`)}}
              >
                <FaPen />
              </button>

              
            </div>
          </div>
          ))
        }
       
      </div>
      <div className='d-flex justify-content-center'>
      {pageTotal > 1 && (
        <Pagination
          count={pageTotal}
          onChange={(e, value) => {
            setPageNumber(value);
          }}
        />
      )}
      </div>
    </div>
    );
};

export default Survey;