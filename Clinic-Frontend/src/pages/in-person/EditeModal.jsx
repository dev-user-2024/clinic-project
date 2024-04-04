import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { visitSchema } from "../../validation";
import { errorHandeling, refreshToken } from "../../services";
const EditeModal = ({ item, list, setList }) => {
  const submitForm = async (values, resetForm) => {
    try {
      let sendData = {
        full_name: values.full_name,
        phone_number: values.phone_number,
        visit: `${values.visit} ${values.time}:00`,
        description: "ss",
        address: "ss",
        doctor : null
      };
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${serverApi}faceToFaceVisit/${item.id}`,
        sendData ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      toast.success("نوبت جدید با موفقیت ویرایش شد");
      let allItem = [...list];
      const itemIndex = allItem.findIndex((i) => i.id == item.id);
      // console.log("dindex",doctorIndex)
      allItem[itemIndex] = { ...data };
      setList(allItem);
      resetForm();
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
                ویرایش نوبت
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
                    full_name: item.full_name,
                    phone_number: item.phone_number,
                    visit:item.visit?.split(" ")[0],
                    time: item.visit?.split(" ")[1],
                    description: "",
                    address: "",
                  }}
                  validationSchema={visitSchema}
                  onSubmit={(values, { resetForm }) => {
                    submitForm(values, resetForm);
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
                        <div className="mb-2  col-lg-3 d-flex align-items-center ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            {" "}
                            نام بیمار
                          </label>
                          <div>
                            <Field
                              name="full_name"
                              type="text"
                              className="form-control w-100"
                            />

                            <ErrorMessage
                              name="full_name"
                              render={(msg) => (
                                <div className="text-danger">{msg}</div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="mb-2  col-lg-3 d-flex align-items-center ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            {" "}
                            شماره تلفن
                          </label>
                          <div>
                            <Field
                              name="phone_number"
                              type="text"
                              className="form-control w-100"
                              placeholder="09112223333"
                            />
                            <ErrorMessage
                              name="phone_number"
                              render={(msg) => (
                                <div className="text-danger">{msg}</div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="mb-2  col-lg-3 d-flex align-items-center "
                            style={{ direction: "rtl" }}
                          >
                            <label
                              className=" ms-2  label-form text-nowrap"
                              htmlFor="name"
                            >
                              {" "}
                              تاریخ
                            </label>
                            <DatePicker
                              value={new Date(values.visit)}
                              calendar={persian}
                              locale={persian_fa}
                              calendarPosition="bottom-right"
                              style={{ height: "30px" }}
                              onChange={(e) => {
                                setFieldValue(
                                  "visit",
                                  `${new Date(e).getFullYear()}-${
                                    new Date(e).getMonth() + 1
                                  }-${new Date(e).getDate()}`
                                );
                              }}
                            />
                          </div>
                          <div className="mb-2 mt-2  col-lg-4 d-flex align-items-center ">
                            <label
                              className=" ms-2  label-form text-nowrap"
                              htmlFor="name"
                            >
                              {" "}
                              ساعت
                            </label>
                            <div>
                              <Field
                                name="time"
                                type="text"
                                className="form-control w-100"
                              />
                              <ErrorMessage
                                name="time"
                                render={(msg) => (
                                  <div className="text-danger">{msg}</div>
                                )}
                              />
                            </div>
                          </div>
                          <div className="mb-2 mx-auto col-lg-3">
                            <button className="add-btn btn">ثبت</button>
                          </div>
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
