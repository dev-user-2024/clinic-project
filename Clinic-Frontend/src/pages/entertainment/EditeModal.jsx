import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { entiermentSchema } from "../../validation";
import Select from "react-select";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { errorHandeling, refreshToken } from "../../services";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
const EditeModal = ({ item, list, setList, list2 }) => {
  const [loading, setLoading] = useState(false);
  const [Disease, setDisease] = useState([]);

  const submitForm = async (values, resetForm) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${serverApi}entertainment/${item.id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data);
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
      let allItem = [...list];
      const itemIndex = allItem.findIndex((i) => i.id === item.id);
      allItem[itemIndex] = { ...data };
      setList(allItem);
      setLoading(false);
      toast.success("با موفقیت ویرایش شد");
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
      setLoading(false);
    }
  };

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
      item.diseases = item.diseases.filter((item) => item.id !== id);
      const { data } = await axios.post(
        `${serverApi}entertainment/deAttachDisease/${item.id}`,
        { diseases: [id] },
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
                ویرایش بازی
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
                <div className="row mt-2 mb-4">
                  {item.diseases?.map((i, index) => (
                    <div className="col-2 " key={index}>
                      <div
                        key={index}
                        className=" d-flex justify-content-between add-box2 "
                      >
                        <span>{i.name}</span>
                        <button
                          onClick={() => {
                            confirmDelete(i.id);
                          }}
                          className="btn"
                        >
                          <FaRegWindowClose />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Formik
                  initialValues={{
                    title: item.title || "",
                    Bazar_link: item.Bazar_link || "",
                    play_store_link: item.play_store_link || "",
                    app_store_link: item.app_store_link || "",
                    description: item.description || "",
                    image: item.image || "",
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2  col-lg-3">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            {" "}
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2 mt-2 col-lg-4">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="app_store_link"
                          >
                            {" "}
                            لینک بازی
                          </label>
                          <Field
                            name="app_store_link"
                            type="text"
                            className="form-control w-100"
                          />
                          <ErrorMessage
                            name="app_store_link"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className=" mb-2 col-lg-3">
                          <button type="submit" className="add-btn btn">
                            {loading ? "لطفا منتظر بمانید" : "ثبت"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditeModal;
