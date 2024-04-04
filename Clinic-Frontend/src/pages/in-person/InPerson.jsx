import React from "react";
import Reservation from "./Reservation";
import { useEffect } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import EditeModal from "./EditeModal";
import { Pagination } from "@mui/material";
import { errorHandeling, refreshToken } from "../../services";
const InPerson = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  let [loading2, setLoading2] = useState(false);
  const [selected, setSelected] = useState({});
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}faceToFaceVisit?page=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        // console.log(data);
        setList(data.data);
        setLoading(false);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
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
  }, [pageNumber]);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف نوبت",
      text: "ایا از حذف این نوبت مطمین هستید",
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
      setList(list.filter((item) => item.id !== id));
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${serverApi}faceToFaceVisit/${id}` ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      // console.log(data);
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

  let selectfile = async (e) => {
    try {
      setLoading2(true);
      const imageFile = e.target.files[0];
      console.log(imageFile.name);
      if (imageFile.name.match(/\.(xlsx)$/)) {
        let datas = new FormData();
        datas.append("file", imageFile);
        const token = localStorage.getItem("token");
        const { data } = await axios.post(
          `${serverApi}faceToFaceVisit/uploadExcel`,
          datas,
          {
            headers: {
              'Content-Type': 'multipart/form-data' ,
              Authorization: `Bearer ${token}`
            }
          },
        );
        console.log(data);
        setList(data)
        toast.success("نوبت ها با موفقیت اضافه شد")
        setLoading2(false);
      } else {
        toast.error("فرمت عکس قابل قبول نیست");
        setLoading(false);
        setLoading2(false);
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await selectfile(e);
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
      setLoading2(false);
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
          وارد کردن نوبت جدید
        </button>
        <div className="mb-2  col-lg-3 d-flex align-items-center ">
          <label
            style={{ width: "250px", height: "50px" }}
            htmlFor="upload_file"
            className="add-btn btn"
          >
            <span>آپلود فایل اکسل</span>
          </label>
          <input
            type="file"
            id="upload_file"
            style={{ display: "none" }}
            onChange={(e) => {
              selectfile(e);
            }}
          />
          {loading2 && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <Reservation list={list} setList={setList} />
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
        <h6 style={{ color: "#828282" }}>لیست رزروهای انجام شده</h6>
        {/*
      <div
          className="mb-2  col-lg-3 d-flex align-items-center "
          style={{ direction: "rtl" }}
        >
          <label className=" ms-2  label-form text-nowrap" htmlFor="name">
            {" "}
            مرتب سازی بر اساس
          </label>
          <select className="form-control w-100">
            <option>تاریخ</option>
          </select>
        </div>
    */}
        {list.map((i, index) => (
          <div key={index} className="col-12 mb-3 item-box">
            <strong>{i.full_name}</strong>
            <strong>{i.phone_number}</strong>
            <strong>
              {Intl.DateTimeFormat("fa-IR").format(new Date(i.visit))}-
              {Intl.DateTimeFormat("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(i.visit))}
            </strong>
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
                data-bs-target="#staticBackdrop2"
              >
                <FaPen />
              </button>
              <EditeModal item={selected} list={list} setList={setList} />
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

export default InPerson;
