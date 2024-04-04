import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile.js";
import { toast } from "react-toastify";
import { SkillSchema } from "../../validation/index.js";
import { errorHandeling, refreshToken } from "../../services/index.js";

const InformationModal = ({ list, setList, categoryList, setCategoruList }) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const sendData = {
        title: values.title,
        file: values.file,
        description: values.description,
      };
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}informationItem`,
        sendData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data2 } = await axios.post(
        `${serverApi}informationCategory/assignItem/${values.category}`,
        { item_id: data.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let copy = [...list];
      copy.push(data);
      setList(copy);
      toast.success("با  موفقیت اضافه شد");
      setLoading(false);
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await submitForm(values)
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
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
                اضافه کردن آیتم جدید
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
                <Formik
                  initialValues={{
                    title: "",
                    file: "",
                    description: "",
                    category: "",
                  }}
                  validationSchema={SkillSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitForm(values);
                  }}
                  enableReinitialize={true}
                >
                  {({
                    isSubmitting,
                    errors,
                    setFieldValue,
                    touched,
                    values,
                  }) => (
                    <Form>
                      <div className=" row d-flex align-items-center mt-4 ">
                        <div className="mb-2  col-lg-3  ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="title"
                          >
                            عنوان
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
                        <div className="mb-2  col-lg-3 ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="category"
                          >
                            دسته بندی
                          </label>
                          <Field
                            name="category"
                            as="select"
                            className="form-control w-100"
                          >
                            <option>لطفا یک گزینه انتخاب کنید</option>
                            {categoryList.map((i, index) => (
                              <option key={index} value={i.id}>
                                {i.title}
                              </option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="category"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2  col-lg-3 ">
                          <label
                            style={{ width: "250px", height: "50px" }}
                            htmlFor="upload_file"
                            className="add-btn btn"
                          >
                            <span>آپلود فایل مربوطه</span>
                          </label>
                          <input
                            type="file"
                            id="upload_file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              handleFileSelect(e, setFieldValue, "file");
                            }}
                          />
                        </div>
                        <div className="mb-2  col-12 ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            توضیحات
                          </label>
                          <Field
                            name="description"
                            as="textarea"
                            className="form-control w-100"
                            style={{ height: "130px", resize: "none" }}
                          />
                          <ErrorMessage
                            name="description"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="mb-2 mx-auto col-lg-3">
                        <button type="submit" className="add-btn btn">
                          {loading ? "لطفا منتظر بمانید" : "ثبت"}
                        </button>
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

export default InformationModal;
