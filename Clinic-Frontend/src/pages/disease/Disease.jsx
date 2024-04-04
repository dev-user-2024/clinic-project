import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { DiseaseSchema } from "../../validation/index.js";
import EditeModal from "./EditeModal.jsx";
import { errorHandeling, refreshToken } from "../../services/index.js";

const Disease = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({});
  let [loading, setLoading] = useState(true);
  let [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverApi}disease`);
        if (data.length > 0) {
          setList(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف بیماری",
      text: "ایا از حذف این بیماری مطمین هستید",
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
      const { data } = await axios.delete(`${serverApi}disease/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const addNew = async (values, resetForm) => {
    try {
      setLoading2(true)
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}disease`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data);
      let copy = [...list];
      copy.push(data);
      setList(copy);
      toast.success("با موفقیت اضافه شد");
      resetForm();
      setLoading2(false)
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await addNew(values, resetForm);
        }
      } else {
        errorHandeling(err);
      }
      setLoading2(false)
    }
  };

  return (
    <div className="w-100">
      <div className="add-box">
        <h5 style={{ fontWeight: "800" }}>اضافه کردن بیماری جدید</h5>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={DiseaseSchema}
          onSubmit={(values, { resetForm }) => {
            addNew(values, resetForm);
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, errors, setFieldValue, touched }) => (
            <Form>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-4">
                <div>
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="name"
                  >
                    نام بیماری:{" "}
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className=" me-3 w-50">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="description"
                  >
                    توضیحات:
                  </label>
                  <Field
                    name="description"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="description"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="m-auto mt-2">
                  <button className="add-btn btn">
                  {
                    loading2 ? "منتظر بمانید"  : "ثبت"
                  }
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
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
        <h6 style={{ color: "#828282" }}>لیست بیماری ها</h6>
        <div className="row g-0 mt-3">
          {list.map((i, index) => (
            <div key={index} className="col-12 mb-3 item-box">
              <strong>{i.name}</strong>
              <div className="d-flex">
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
                <EditeModal item={selected} list={list} setList={setList} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Disease;
