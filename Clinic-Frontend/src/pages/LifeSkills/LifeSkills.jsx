import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import LifeSkillsModal from "./LifeSkillsModal";
import CategoryModal from "./CategoryModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { Pagination } from "@mui/material";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import EditeModal from "./EditeModal";
import { errorHandeling, refreshToken } from "../../services";

const LifeSkills = () => {
  const [list, setList] = useState([]);
  const [categoryList, setCategoruList] = useState([]);
  const [category, setCategory] = useState(0);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  let [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       if(category ==0){
        const { data: item } = await axios.get(
          `${serverApi}item?page=${pageNumber}`
        );
        // console.log(item);
        setList(item.data);
        const page = Math.ceil(item.total / item.per_page);
        setPageTotl(page);
       }else{
        const { data } = await axios.get(`${serverApi}categoryLifeSkills/${category}`);
        // console.log(data);
        setList(data.items)
       }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("خطایی رخ داده است مجددا تلاش کنید")
      }
    };
    fetchData();
  }, [pageNumber, category]);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف آیتم",
      text: "ایا از حذف این آیتم مطمین هستید",
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
    const allItem = [...categoryList];
    try {
      setList(list.filter((item) => item.id !== id));
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${serverApi}item/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
    } catch (err) {
      Swal.close();
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          removeListener(id)
        }
      } else {
        errorHandeling(err);
      }      setList(allItem);
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
          اضافه کردن آیتم جدید
        </button>
        <button
          className="add-btn btn me-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop2"
          style={{ width: "250px", height: "50px" }}
        >
          دسته بندی ها
        </button>
        <LifeSkillsModal
          list={list}
          setList={setList}
          categoryList={categoryList}
          setCategoruList={setCategoruList}
        />
        <CategoryModal
          categoryList={categoryList}
          setCategoruList={setCategoruList}
        />
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
          <select className="form-control w-100" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value={0}>همه</option>
              {
                categoryList.map((i,index)=>(
                  <option value={i.id} key={index}>{i.title}</option>
                ))
              }
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
        {list.map((i, index) => (
          <div className="col-12 mb-3 item-box" key={index}>
            <strong>{i.title}</strong>
            <strong>{i.category_life_skill?.title}</strong>
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
                onClick={() => {
                  setSelected(i);
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop3"
              >
                <FaPen />
              </button>
              <EditeModal
                item={selected}
                list={list}
                setList={setList}
                categoryList={categoryList}
                setCategoruList={setCategoruList}
              />
            </div>
          </div>
        ))}
      </div>
      {pageTotal > 1 && (
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

export default LifeSkills;
