import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useState } from "react";
import { errorHandeling, refreshToken } from "../../services";
const SurveyModal = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const addNew =async()=>{
    try{
      setLoading(true)
      const title = document.getElementById("name").value
      const token = localStorage.getItem("token");
      if(title){
        const {data} = await axios.post(`${serverApi}survey`, {title} ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setLoading(false)
        toast.success("نظر سنجی با موفقیت ایجاد شد")
        window.location.pathname = `/add-survey/${data.id}`
      }else{
        setLoading(false)
        toast.error("لطفا نام نظر سنجی را وارد کنید")
      }
    }catch(err){
      console.log(err)
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          addNew()
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false)

    }
  }
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-box">
          <div className="modal-content" style={{ width: "100%" }}>
            <div className="p-4 d-flex justify-content-between">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                ساخت نظر سنجی جدید
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="add-box">
              <div className="mb-2  col-lg-3 d-flex align-items-center ">
              <label
                className=" ms-2  label-form text-nowrap"
                htmlFor="name"
              >
                نام نظر سنجی
              </label>
              <input
                name="name"
                type="text"
                className="form-control w-100"
                id="name"
              />
            </div>
            <div className="mb-2 mx-auto col-lg-3">
            <button className="add-btn btn" onClick={()=>{addNew()}}>
            {
              !loading ? "ثبت" : "لطفا منتظر بمانید"
            }
            </button>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
