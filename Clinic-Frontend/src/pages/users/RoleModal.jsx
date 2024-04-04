import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { categorySkillSchema } from "../../validation/index.js";
import Select from "react-select";
import { errorHandeling, refreshToken } from "../../services/index.js";
const RoleModal = ({ roleList, setRoleList }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}role`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.length > 0) {
          setRoleList(data);
        }
        const { data: data2 } = await axios.get(
          `${serverApi}role/allPermissions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //   console.log(data2)
        let arry = [];
        for (const key in data2) {
          if (data2.hasOwnProperty(key)) {
            const value = data2[key];
            let x = {
              label: value,
              value: key,
            };
            arry.push(x);
          }
        }
        setOptions(arry);
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status =await refreshToken()
          if (status) {
            fetchData();
          }
        } else {
          errorHandeling(err);
        }
      }
    };
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "حذف نقش",
      text: "ایا از حذف این نقش مطمین هستید",
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
    const allItem = [...roleList];
    try {
      setRoleList(roleList.filter((item) => item.id !== id));
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${serverApi}role/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
    } catch (err) {
      Swal.close();
      console.log(err);
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          removeListener(id);
        }
      } else {
        errorHandeling(err);
      }
      setRoleList(allItem);
    }
  };
  const submitForm = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}role`,
        {
          name: values.name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let copy = [...roleList];
      copy.push(data);
      setRoleList(copy);
      let arry = [];
      values.access.map((i) => {
        arry.push(i.value);
      });
      const { data2 } = await axios.post(
        `${serverApi}role/setPermissions/${data.id}`,
        { routes: arry },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      toast.success("با  موفقیت اضافه شد");
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
                نقش ها
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
                    name: "",
                    access: "",
                  }}
                  validationSchema={""}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
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
                        <div className="mb-2  col-lg-3 ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            نام نقش
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
                        <div className="mb-2  col-lg-4 ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="name"
                          >
                            دسترسی ها
                          </label>
                          <Select
                            placeholder="لطفا یک گزینه انتخاب کنید"
                            name="drug_store_id"
                            options={options}
                            isMulti
                            closeMenuOnSelect={false}
                            className="basic-multi-select  w-100"
                            classNamePrefix="select"
                            onChange={(e) => {
                              setFieldValue("access", e);
                            }}
                          />
                          <ErrorMessage
                            name="drug_store_id"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2 mx-auto col-lg-3">
                          <button type="submit" className="add-btn btn">
                            {loading ? "لطفا منتظر بمانید" : "ثبت"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="row mt-4">
                <h6 style={{ color: "#828282" }}>لیست دسته بندی ها</h6>
                {roleList.map((i, index) => (
                  <div className="col-4 mb-3" key={index}>
                    <div className="item-box">
                      <strong>{i.name}</strong>
                      <div className="d-flex">
                        <button
                          style={{
                            backgroundColor: "#f0fcf6",
                            color: "#2c7f75",
                          }}
                          className="btn ms-2"
                          onClick={() => {
                            confirmDelete(i.id);
                          }}
                        >
                          <FaTrash />
                        </button>
                        {/*
                       <button
                        style={{ backgroundColor: "#f0fcf6", color: "#2c7f75" }}
                        className="btn ms-2"
                      >
                        <FaPen />
                      </button>
                      */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
