import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { toast } from "react-toastify";
import { usersSchema } from "../../validation/index.js";
import { errorHandeling, refreshToken } from "../../services/index.js";

const UserModl = ({ list, setList, roleList }) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const sendData = {
        mobile: values.mobile,
        nationality_id: values.nationality_id,
      };
      const token = localStorage.getItem("token");
      const data = await axios.post(`${serverApi}user`, sendData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sendData2 = { role_id: values.roleId };
      const { data2 } = await axios.post(
        `${serverApi}user/assignRole/${data.data.id}`,
        sendData2,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let copy = [...list];
      copy.push(data.data);
      setList(copy);
      toast.success("با  موفقیت اضافه شد");
      setLoading(false);
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
                اضافه کردن کاربر جدید
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
                    mobile: "",
                    nationality_id: "",
                    roleId: "",
                  }}
                  validationSchema={usersSchema}
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
                            htmlFor="mobile"
                          >
                            شماره موبایل کاربر
                          </label>
                          <Field
                            name="mobile"
                            type="tel"
                            className="form-control w-100"
                          />

                          <ErrorMessage
                            name="mobile"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2  col-lg-3  ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="nationality_id"
                          >
                            کد ملی کاربر
                          </label>
                          <Field
                            name="nationality_id"
                            type="text"
                            className="form-control w-100"
                          />

                          <ErrorMessage
                            name="nationality_id"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2  col-lg-3 ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="roleId"
                          >
                            نقش کاربر
                          </label>
                          <Field
                            name="roleId"
                            as="select"
                            className="form-control w-100"
                          >
                            <option>لطفا یک گزینه انتخاب کنید</option>
                            {roleList.map((i, index) => (
                              <option key={index} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="roleId"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="mb-2 mx-auto col-lg-3 mt-5">
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

export default UserModl;
