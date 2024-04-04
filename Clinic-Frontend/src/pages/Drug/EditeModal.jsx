import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Select from "react-select";
import { drugSchema } from "../../validation";
import { FaRegWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { errorHandeling, refreshToken } from "../../services/index.js";
const EditeModal = ({ item, list, setList, diseaseList, drugStoreList }) => {
  const [loading, setLoading] = useState(false);
  const [drogStore, setDrogStore] = useState([]);
  const submitForm = async (values) => {
    try {
      setLoading(true);
      let arry = [];
      drogStore.map((i) => {
        arry.push(i.value);
      });
      let arry3 = [];
      drogStore.map((i) => {
        arry3.push(values.possess);
      });
      let sendData = {
        name: values.name,
        drug_stores: arry,
        possesses: arry3,
      };
      // console.log(sendData);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${serverApi}drug/${item.id}`, sendData ,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      // console.log(data);
      let allItem = [...list];
      const itemIndex = allItem.findIndex((i) => i.id === item.id);
      allItem[itemIndex] = { ...data };
      setList(allItem);
      if (values.diseases.length > 0) {
        let arry2 = [];
        values.diseases.map((i) => {
          arry2.push(i.value);
        });
        const { data: data2 } = await axios.post(
          `${serverApi}drug/attachDisease/${data.id}`,
          { diseases: arry2 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setLoading(false);
      toast.success("با  موفقیت ویرایش شد");
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
        `${serverApi}drug/deAttachDisease/${item.id}`,
        { diseases: [id] } ,{
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

  useEffect(() => {
    let arry = [];
    item.drug_stores?.map((i) => {
      let x = {
        label: i.name,
        value: i.id,
      };
      arry.push(x);
    });
    setDrogStore(arry);
  }, [item]);

  const addNewDrogStore = (e) => {
    let copy = [...drogStore];
    copy.push(e);
    setDrogStore(e);
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
                <div className="row mt-2 mb-4">
                  <p>لیست بیماری ها</p>
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
                <div className="row mt-2 mb-4">
                  <p>لیست داروخانه ها</p>
                  {drogStore?.map((i, index) => (
                    <div className="col-2 " key={index}>
                      <div
                        key={index}
                        className=" d-flex justify-content-between add-box2 "
                      >
                        <span>{i.label}</span>
                        <button
                          onClick={() => {
                            setDrogStore(
                              drogStore.filter((item) => item.value !== i.value)
                            );
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
                    name: item.name || "",
                    drug_stores: "",
                    diseases: "",
                    possess: false,
                  }}
                  validationSchema={''}
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
                      <div className=" row d-flex align-items-center justify-content-between mt-4 ">
                        <div className="mb-4 col-lg-3">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            نام داروخانه
                          </label>
                          <Select
                            placeholder="لطفا یک گزینه انتخاب کنید"
                            name="drug_stores"
                            options={drugStoreList}
                            className="basic-multi-select  w-100"
                            classNamePrefix="select"
                            onChange={(e) => {
                              addNewDrogStore(e);
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                          />
                          <ErrorMessage
                            name="drug_stores"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-4 col-lg-3">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            نام دارو
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
                        <div className="mb-4 col-lg-3">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            بیماری مربوطه
                          </label>
                          <Select
                            placeholder="لطفا یک گزینه انتخاب کنید"
                            name="diseases"
                            options={diseaseList}
                            className="basic-multi-select  w-100"
                            classNamePrefix="select"
                            onChange={(e) => {
                              setFieldValue("diseases", e);
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                          />
                          <ErrorMessage
                            name="diseases"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-4 col-lg-2">
                          <label>
                            موجود:
                            <Field
                              type="checkbox"
                              className="me-2"
                              name="possess"
                            />
                          </label>
                          <ErrorMessage
                            name="possess"
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
