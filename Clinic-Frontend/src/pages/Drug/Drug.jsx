import React from "react";
import { FaPen, FaSearch, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import EditeModal from "./EditeModal";
import { Pagination } from "@mui/material";
import AddDrug from "./AddDrug.jsx";
import { errorHandeling, refreshToken } from "../../services/index.js";
const Drug = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [diseaseList, setdiseaseList] = useState([]);
  const [selected, setSelected] = useState({});
  const [drugStoreList, setDrugStoreList] = useState([]);
  let [loading, setLoading] = useState(true);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverApi}drug?page=${pageNumber}`);
        // console.log(data);
        setList(data.data);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
        const { data: drugStore } = await axios.get(`${serverApi}drugStore`);
        let arry = [];
        drugStore.data.map((i, index) => {
          let x = { label: i.name, value: i.id };
          arry.push(x);
        });
        setDrugStoreList(arry);
        const { data: data2 } = await axios.get(`${serverApi}disease`);
        if (data2.length > 0) {
          let arry2 = [];
          data2.map((i) => {
            let x = { label: i.name, value: i.id };
            arry2.push(x);
          });
          setdiseaseList(arry2);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  const searchDrug = async () => {
    try {
      if (search) {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}drug/searchName/${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        if (data.length > 0) {
          setList(data);
        } else {
          toast.error(
            "نتیجه ای یافت نشد، لطفا نام دارو رو به طور کامل وارد کنید"
          );
        }
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          searchDrug();
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف دارو",
      text: "ایا از حذف این دارو مطمین هستید",
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
      const { data } = await axios.delete(`${serverApi}drug/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  return (
    <div>
      <div className="add-box">
        <h5 style={{ fontWeight: "800" }}>اضافه کردن داروی جدید</h5>
        <AddDrug
          list={list}
          setList={setList}
          drugStoreList={drugStoreList}
          diseaseList={diseaseList}
        />
      </div>
      <div className="row mt-3 align-items-center justify-content-between">
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
        <div className="col-md-6 col-lg-8 d-flex">
          <input
            placeholder="جستجو..."
            className="form-control w-100"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="btn add-btn me-3"
            onClick={() => {
              searchDrug();
            }}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <h6 style={{ color: "#828282" }}>لیست داروها</h6>
        {list.map((i, index) => (
          <div className="col-12 mb-3 item-box" key={index}>
            <span style={{ width: "33%" }}>{i.name}</span>
            <div style={{ width: "33%" }}>
              {i.drug_stores.map((d, index2) => (
                <div className="text-end" key={index2}>
                  <strong>{d.name}</strong>
                </div>
              ))}
            </div>
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
                data-bs-target="#staticBackdrop"
              >
                <FaPen />
              </button>
              <EditeModal
                item={selected}
                list={list}
                setList={setList}
                diseaseList={diseaseList}
                drugStoreList={drugStoreList}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
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

export default Drug;
