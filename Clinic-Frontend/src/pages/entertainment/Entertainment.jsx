import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaPen, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { entiermentSchema } from "../../validation/index.js";
import EditeModal from "./EditeModal.jsx";
import { Pagination } from "@mui/material";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
import { errorHandeling, refreshToken } from "../../services/index.js";
const Entertainment = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [selected, setSelected] = useState({});
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  let [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [Disease, setDisease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${serverApi}entertainment?page=${pageNumber}`
        );
        // console.log(data)
        setList(data.data);
        setLoading(false);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
        const { data: data2 } = await axios.get(`${serverApi}disease`);
        if (data2.length > 0) {
          let arry2 = [];
          data2.map((i) => {
            let x = { label: i.name, value: i.id };
            arry2.push(x);
          });
          setList2(arry2);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف بازی",
      text: "ایا از حذف این بازی مطمین هستید",
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
    const token = localStorage.getItem("token");
    try {
      setList(list.filter((item) => item.id !== id));
      const { data } = await axios.delete(`${serverApi}entertainment/${id}` ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
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

  const submitForm = async (values) => {
    try {
      setLoading2(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${serverApi}entertainment`, values,
       {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      let copy = [...list];
      copy.push(data);
      setList(copy);
      if (Disease.length > 0) {
        let arry2 = [];
        Disease.map((i) => {
          arry2.push(i.value);
        });
        const { data: data2 } = await axios.post(
          `${serverApi}entertainment/attachDisease/${data.id}`,
          { diseases: arry2 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setLoading2(false);
      toast.success("با  موفقیت اضافه شد");
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await submitForm(values);
        }
      } else {
        errorHandeling(err);
      }
      setLoading2(false);
    }
  };
  return (
    <div>
      <div className="add-box">
        <h5 style={{ fontWeight: "800" }}>اضافه کردن بازی جدید</h5>
        <Formik
          initialValues={{
            title: "",
            Bazar_link: "",
            play_store_link: "",
            app_store_link: "",
            description: "",
            image: "",
          }}
          validationSchema={entiermentSchema}
          onSubmit={(values, { resetForm }) => {
            submitForm(values);
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, errors, setFieldValue, touched }) => (
            <Form>
              <div className=" row d-flex align-items-center justify-content-between mt-4 ">
                <div className="mb-2  col-lg-5">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="name"
                  >
                    نام بیماری
                  </label>
                  <Select
                    placeholder="لطفا یک گزینه انتخاب کنید"
                    isMulti
                    name="colors"
                    options={list2}
                    className="basic-multi-select  w-100"
                    classNamePrefix="select"
                    closeMenuOnSelect={false}
                    onChange={(e) => {
                      setDisease(e);
                    }}
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="mb-2  col-lg-3">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="title"
                  >
                    نام بازی
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="title"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="mb-2  col-lg-3">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="name"
                  >
                    بنر بازی :
                  </label>
                  <label htmlFor="upload_file" className="add-btn btn">
                    <span>آپلود فایل</span>
                  </label>
                  <input
                    type="file"
                    id="upload_file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleFileSelect(e, setFieldValue, "image");
                    }}
                  />
                </div>
                <div className="mb-2 mt-2 col-lg-4">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="Bazar_link"
                  >
                    لینک بازار
                  </label>
                  <Field
                    name="Bazar_link"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="Bazar_link"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="mb-2 mt-2 col-lg-4">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="play_store_link"
                  >
                    لینک گوگل پلی
                  </label>
                  <Field
                    name="play_store_link"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="play_store_link"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="mb-2 mt-2 col-lg-4">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="app_store_link"
                  >
                    لینک بازی
                  </label>
                  <Field
                    name="app_store_link"
                    type="text"
                    className="form-control w-100"
                  />
                  <ErrorMessage
                    name="app_store_link"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
                <div className="mb-2 mt-2 col-lg-12">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="description"
                  >
                    توضیحات :
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
                <div className=" mb-2 col-lg-3">
                  <button className="add-btn btn">
                    {loading2 ? "لطفا منتظر بمانید" : "ثبت"}
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
        <h6 style={{ color: "#828282" }}>لیست بازی ها</h6>
        {list.map((i, index) => (
          <div key={index} className="col-12 mb-3 item-box">
            <strong>{i.title}</strong>
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
              <EditeModal
                item={selected}
                list={list}
                setList={setList}
                list2={list2}
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

export default Entertainment;
