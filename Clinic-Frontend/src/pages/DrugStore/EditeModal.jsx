import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { drugStoreSchema } from "../../validation";
import { useState } from "react";
import { errorHandeling, refreshToken } from "../../services";
const EditeModal = ({ item, list, setList }) => {
  let [loading, setLoading] = useState(false);

  const submitForm = async (values, resetForm) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${serverApi}drugStore/${item.id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
          submitForm(values);
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
                ویرایش داروخانه
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
                    latitude: 35.680588,
                    longitude: 51.322928,
                    address: item.address || "",
                    name: item.name || "",
                    drug_store_id: 1,
                    posssess: true,
                  }}
                  validationSchema={drugStoreSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitForm(values);
                  }}
                  enableReinitialize={true}
                >
                  {({ isSubmitting, errors, setFieldValue, touched }) => (
                    <Form>
                      <div className=" row d-flex align-items-center justify-content-between mt-4 ">
                        <div className="mb-2  col-lg-3  ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            نام داروخانه:
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
                        <div className="mb-2  col-lg-3  ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="address"
                          >
                            آدرس:
                          </label>
                          <Field
                            name="address"
                            type="text"
                            className="form-control w-100"
                          />
                          <ErrorMessage
                            name="address"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className=" mb-2 col-lg-3">
                          <button className="add-btn btn">
                            {loading ? "منتظر بمانید" : "ثبت"}
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
