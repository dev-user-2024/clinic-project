import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
import { toast } from "react-toastify";
import {  useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { meditaionSchema } from "../../validation";
import { errorHandeling, refreshToken } from "../../services";
import { useEffect } from "react";
const MeditaionModal = ({list,setList}) => {
  const [loading, setLoading] = useState(false);
  const [list2,setList2] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data : data2 } = await axios.get(`${serverApi}disease`);
        if(data2.length > 0){
          setList2(data2);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      let sendData = {...values};
      delete sendData.disease_id 
      const {data} = await axios.post(`${serverApi}meditation`, sendData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      let copy = [...list];
      copy.push(data);
      if(values.disease_id){
        const { data  : data2} = await axios.post(
          `${serverApi}meditation/attachDisease/${data.id}`,
         {disease_id : values.disease_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setList(copy);
      setLoading(false)
      toast.success("با  موفقیت اضافه شد");
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
        await  submitForm(values);
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
                اضافه کردن مدیتیشن جدید
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
                    title : "",
                    description : "",
                    type : "",
                    file:"",
                    disease_id : ""
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
                        <div className="mb-2  col-lg-3 ">
                        <label
                          className=" ms-2  label-form text-nowrap"
                          htmlFor="disease_id"
                        >
                        بیماری مربوطه
                        </label>
                        <Field
                          name="disease_id"
                          as='select'
                          className="form-control w-100"
                        >
                        <option>لطفا یک گزینه انتخاب کنید</option>
                        {
                          list2.map((i,index)=>(
                            <option value={i.id} key={index}>{i.name}</option>
                          ))
                        }
                        
                        </Field>

                        <ErrorMessage
                          name="disease_id"
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

export default MeditaionModal;
