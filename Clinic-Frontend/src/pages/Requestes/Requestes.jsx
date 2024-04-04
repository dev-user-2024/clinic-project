import React from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { errorHandeling, refreshToken } from "../../services/index.js";
const Requestes = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}potentialUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setList(data);
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
  }, []);

  const confirmUser = (i) => {
    Swal.fire({
      title: "تایید کاربر",
      text: `آیا از ایجاد کاربر جدید با شماره تلفن ${i.mobile} و شماره ملی ${i.nationality_id} مطمین هستید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        addUser(i);
      }
    });
  };

  const addUser = async (i) => {
    try {
      const token = localStorage.getItem("token");
      const sendData = {
        mobile: i.mobile,
        nationality_id: i.nationality_id,
      };
      const { data } = await axios.post(`${serverApi}user`, sendData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      Swal.fire("تایید", " با موفقیت ایجاد شد", "success");
    } catch (err) {
      Swal.close();
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await addUser(i);
        }
      } else {
        errorHandeling(err);
      }
    }
  };

  return (
    <div>
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
        <h6 style={{ color: "#828282" }}>لیست درخواست ها</h6>
        {list.map((i, index) => (
          <div key={index} className="col-12 mb-3 item-box px-3">
            <strong>{i.full_name}</strong>
            <strong>{i.mobile}</strong>
            <strong>{i.nationality_id}</strong>
            <button
              style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
              className="btn ms-2"
              onClick={() => {
                confirmUser(i);
              }}
            >
              <FaCheck />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requestes;
