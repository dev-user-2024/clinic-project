import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import QuizModal from "./QuizModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { errorHandeling, refreshToken } from "../../services";
const Quiz = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  let [loading, setLoading] = useState(true);
  const [pageTotal1, setPageTotl1] = useState(0);
  const [pageTotal2, setPageTotl2] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [type,setType] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz?page=${pageNumber}`
        );
        setList(data.data);
        const { data : data2 } = await axios.get(
          `${serverApi}descriptiveQuiz?page=${pageNumber}`
        );
        setList2(data2.data);
        setLoading(false);
        const page1 = Math.ceil(data.total / data.per_page);
        const page2 = Math.ceil(data2.total / data.per_page);
        setPageTotl1(page1) 
        setPageTotl2(page2) 
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  const confirmDelete = (id, type) => {
    Swal.fire({
      title: "حذف آزمون",
      text: "ایا از حذف این آزمون مطمین هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        removeListener(id, type);
      }
    });
  };

  const removeListener = async (id , type) => {
    const allItem = [...list];
    try {
      const token = localStorage.getItem("token");
      if(type ==1){
        setList(list.filter((item) => item.id !== id));
        const { data } = await axios.delete(`${serverApi}multiChoiceQuiz/${id}` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
      }else{
        setList2(list2.filter((item) => item.id !== id));
        const { data } = await axios.delete(`${serverApi}descriptiveQuiz/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
      }
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
    } catch (err) {
      Swal.close();
      setList(allItem);
      console.log(err)
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          removeListener(id, type)
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
          ساخت آزمون جدید
        </button>
        <QuizModal />
      </div>
      <div className="row mt-4">
        <div className="col-4 d-flex align-items-center">
          <label className="ms-2" style={{width:"80px"}}>نوع آزمون</label>
          <select className="form-control w-100" onChange={(e)=>{setType(e.target.value)}}>
            <option value={1}>آزمون های چند گزینه ای</option>
            <option value={2}>آزمون های ترکیبی</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
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
        <h6 style={{ color: "#828282" }}>لیست آزمون ها</h6>
        {
         type==1 && list.map((i,index)=>(
            <div className="col-12 mb-3 item-box" key={index}>
            <strong style={{width:"150px"}}>{i.title}</strong>
            <Link to={`/multiChoiceQuiz/result/${i.id}`}>مشاهده نتایج</Link>
            <div className="d-flex flex-column flex-md-row">
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={() => {
                  confirmDelete(i.id,1);
                }}
              >
                <FaTrash />
              </button>
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={()=>{navigate(`/multiChoiceQuiz/${i.id}`)}}
              >
                <FaPen />
              </button>

              
            </div>
          </div>
          ))
        }
        {
          type==2 && list2.map((i,index)=>(
            <div className="col-12 mb-3 item-box" key={index}>
            <strong style={{width:"150px"}}>{i.title}</strong>
            <Link to={`/descriptiveQuiz/result/${i.id}`}>مشاهده نتایج</Link>
            <div className="d-flex flex-column flex-md-row">
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={() => {
                  confirmDelete(i.id,2);
                }}
              >
                <FaTrash />
              </button>
              <button
                style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                className="btn ms-2"
                onClick={()=>{navigate(`/descriptiveQuiz/${i.id}`)}}
              >
                <FaPen />
              </button>

              
            </div>
          </div>
          ))
        }
      </div>
      <div className="d-flex justify-content-center">
        {type ==1 && pageTotal1 > 1 && (
          <Pagination
            count={pageTotal1}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
        {type ==2 && pageTotal2 > 1 && (
          <Pagination
            count={pageTotal2}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
