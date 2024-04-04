import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { Pagination } from "@mui/material";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import EditeModal from "./EditeModal";
import UserModl from "./UserModl";
import RoleModal from "./RoleModal";
import { errorHandeling, refreshToken } from "../../services/index.js";
const Users = () => {
  const [list, setList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  let [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data: item } = await axios.get(
          `${serverApi}user?page=${pageNumber}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setList(item.data);
        const page = Math.ceil(item.total / item.per_page);
        setPageTotl(page);
        setLoading(false);
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
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف کاربر",
      text: "ایا از حذف این کاربر مطمین هستید",
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
    const allItem = [...roleList];
    try {
      setList(list.filter((item) => item.id !== id));
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${serverApi}user/${id}` ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

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
      }
      setList(allItem);
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
          اضافه کردن کاربر
        </button>
        <button
          className="add-btn btn me-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop2"
          style={{ width: "250px", height: "50px" }}
        >
          نقش ها
        </button>
        <UserModl
          list={list}
          setList={setList}
          roleList={roleList}
          setRoleList={setRoleList}
        />
       { !loading &&
        <RoleModal roleList={roleList} setRoleList={setRoleList} />
       }
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
        {list.map((i, index) => (
          <div className="col-12 mb-3 item-box" key={index}>
            <strong>{i.mobile}</strong>
            <strong>{i.nationality_id}</strong>
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
                roleList={roleList}
                setRoleList={setRoleList}
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

export default Users;
