import React from 'react';
import { FaTrash } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi} from "../../confing/confing.js";
import { Pagination } from "@mui/material";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { errorHandeling, refreshToken } from '../../services';
const Tickets = () => {
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [type, setType] = useState("1");
    const [categoryList, setCategoruList] = useState([]);
    const [pageTotal, setPageTotl] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    let [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const { data } = await axios.get(`${serverApi}ticket/inProgress`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log(data)
          if(data.length > 0){
            setList(data);
          }
          const { data: data2 } = await axios.get(
            `${serverApi}ticket`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // console.log(data2)
          if(data2.data.length > 0){
            setList2(data2.data);
          }
          const page = Math.ceil(data2.total / data2.per_page);
          setPageTotl(page);
          setLoading(false);
        } catch (err) {
          console.log(err);
          let status = err?.response?.status;
          if (status === 401) {
            let status = await refreshToken();
            if (status) {
             fetchData()
            }
          } else {
            errorHandeling(err);
          }
          setLoading(false);
         
        }
      };
      fetchData();
    }, [pageNumber]);
    return (
        <div>
        <div className="row p-2">
          <button
            className="add-btn btn me-2"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop2"
            style={{ width: "250px", height: "50px" }}
          >
            دسته بندی تیکت ها
          </button>
          {
            !loading && <CategoryModal
            categoryList={categoryList}
            setCategoruList={setCategoruList}
          />
          }
        </div>
        <div className="row mt-4">
          <h6 style={{ color: "#828282" }}>لیست مهارت ها</h6>
          <div
            className="mb-2  col-lg-3 d-flex align-items-center "
            style={{ direction: "rtl" }}
          >
            <label className=" ms-2  label-form text-nowrap" htmlFor="name">
              {" "}
              دسته بندی
            </label>
            <select className="form-control w-100" onChange={(e)=>{setType(e.target.value)}}>
              <option value={1}>پاسخ داده نشده</option>
              <option value={2}>همه</option>
            </select>
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
          {type ==="1" && list.map((i, index) => (
           <Link to={`${i.id}`} key={index}>
           <div className="col-12 mb-3 item-box px-3" key={index}>
           <strong>{i.title}</strong>
           <strong> {Intl.DateTimeFormat("fa-IR").format(new Date(i.updated_at))}</strong>
         </div>
           </Link>
          ))}
          {type ==="2" && list2.map((i, index) => (
            <Link to={`${i.id}`} key={index}>
            <div className="col-12 mb-3 item-box px-3" key={index}>
            <strong>{i.title}</strong>
            <strong> {Intl.DateTimeFormat("fa-IR").format(new Date(i.updated_at))}</strong>
          </div>
            </Link>
          ))}
        </div>
        {type ===2 && pageTotal > 1 && (
          <Pagination
            count={pageTotal}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
      </div>
    );
};

export default Tickets;