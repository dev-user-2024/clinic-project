import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import Select from "react-select";
import { drugSchema } from "../../validation/index";
import { toast } from "react-toastify";
import { errorHandeling, refreshToken } from "../../services";

const AddDrug = ({ list, setList, drugStoreList, diseaseList }) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      let arry = [];
      values.drug_stores.map((i) => {
        arry.push(i.value);
      });
      let arry3 = [];
      values.drug_stores.map((i) => {
        arry3.push(values.possess);
      });
      let sendData = {
        name: values.name,
        drug_stores: arry,
        possesses: arry3,
      };
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${serverApi}drug`, sendData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   console.log(data);
      let copy = [...list];
      copy.push(data);
      setList(copy);
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
      setLoading(false);
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
      setLoading(false)
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          drug_stores: "",
          diseases: "",
          possess: false,
        }}
        validationSchema={drugSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, setFieldValue, touched, values }) => (
          <Form>
            <div className=" row d-flex align-items-center justify-content-between mt-4 ">
              <div className="mb-4 col-lg-3">
                <label className=" ms-2  label-form text-nowrap" htmlFor="name">
                  نام داروخانه
                </label>
                <Select
                  placeholder="لطفا یک گزینه انتخاب کنید"
                  name="drug_stores"
                  options={drugStoreList}
                  className="basic-multi-select  w-100"
                  classNamePrefix="select"
                  onChange={(e) => {
                    setFieldValue("drug_stores", e);
                  }}
                  isMulti
                  closeMenuOnSelect={false}
                />
                <ErrorMessage
                  name="drug_stores"
                  render={(msg) => <div className="text-danger">{msg}</div>}
                />
              </div>
              <div className="mb-4 col-lg-3">
                <label className=" ms-2  label-form text-nowrap" htmlFor="name">
                  {" "}
                  نام دارو
                </label>
                <Field name="name" type="text" className="form-control w-100" />
                <ErrorMessage
                  name="name"
                  render={(msg) => <div className="text-danger">{msg}</div>}
                />
              </div>
              <div className="mb-4 col-lg-3">
                <label className=" ms-2  label-form text-nowrap" htmlFor="name">
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
                  render={(msg) => <div className="text-danger">{msg}</div>}
                />
              </div>
              <div className="mb-4 col-lg-2">
                <label>
                  موجود:
                  <Field type="checkbox" className="me-2" name="possess" />
                </label>
                <ErrorMessage
                  name="possess"
                  render={(msg) => <div className="text-danger">{msg}</div>}
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
  );
};

export default AddDrug;
