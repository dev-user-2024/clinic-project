import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { meditaionSchema } from "../../validation";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
import {useState} from "react"
import { errorHandeling, refreshToken } from "../../services/index.js";
const EditeModal = ({ item, list, setList }) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const {data} = await axios.put(`${serverApi}meditation/${item.id}`, values ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      let allItem = [...list];
      const itemIndex = allItem.findIndex((i) => i.id == item.id);
      allItem[itemIndex] = { ...data };
      setList(allItem);
      setLoading(false)
      toast.success("با  موفقیت ویرایش شد");
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
      setLoading(false)
      
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-box">
          <div className="modal-content" style={{ width: "100%" }}>
            <div className="p-4 d-flex justify-content-between">
              <h1 className="modal-title fs-5" id="staticBackdropLabel2">
                ویرایش مدیتیشن
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
                title : item.title || "",
                description :item.description || "",
                type : item.type ||"",
                file:item.file || ""
              }}
              validationSchema={meditaionSchema}
              onSubmit={(values, { resetForm }) => {
              submitForm(values)
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
                  <div className=" row mt-4 ">
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
                        htmlFor="type"
                      >
                        دسته بندی
                      </label>
                      <Field
                        name="type"
                        as="select"
                        className="form-control w-100"
                      >
                        <option>لطفا یک گزینه انتخاب کنید</option>
                        <option value='BEGINNER'>مبتدی</option>
                        <option value='ADVANCE'>پیشرفته</option>
                      </Field>

                      <ErrorMessage
                        name="type"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2  col-lg-3  ">
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
                          handleFileSelect(e, setFieldValue,"file");
                        }}
                      />
                    </div>
                    <div className="mb-2  col-12  ">
                      <label
                        className=" ms-2  label-form text-nowrap"
                        htmlFor="description"
                      >
                        {" "}
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
                    {
                      loading ? "لطفا منتظر بمانید" : "ثبت"
                    }
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

export default EditeModal;
