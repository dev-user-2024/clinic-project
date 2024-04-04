import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { DiseaseSchema } from "../../validation";
import { errorHandeling, refreshToken } from "../../services";
import { useState } from "react";
const EditeModal = ({ item, list, setList }) => {
  const [loading,setLoading] = useState(false)
  const submitForm = async (values, resetForm) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${serverApi}disease/${item.id}`,
        values,{
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let allItem = [...list];
      const itemIndex = allItem.findIndex((i) => i.id === item.id);
      allItem[itemIndex] = { ...data };
      setList(allItem);
      toast.success("با موفقیت ویرایش شد");
      setLoading(false)
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await submitForm(values,resetForm)
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
                ویرایش بیماری
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
                    name: item.name || "",
                    description: item.description || "",
                  }}
                  validationSchema={DiseaseSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitForm(values);
                  }}
                  enableReinitialize={true}
                >
                  {({ isSubmitting, errors, setFieldValue, touched }) => (
                    <Form>
                      <div className="text-end d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-4 ">
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
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
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="m-auto mt-2">
                          <button className="add-btn btn" type="submit">
                            {
                              loading? "منتظر بمانید"  :"ثبت"
                            }
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
