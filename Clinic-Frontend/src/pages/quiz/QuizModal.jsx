import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { errorHandeling, refreshToken } from "../../services";
import { useEffect } from "react";
const QuizModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list,setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data : data2 } = await axios.get(`${serverApi}disease`);
        if(data2.length > 0){
          setList(data2);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addNew = async (values) => {
    try {
      console.log(values)
      const token = localStorage.getItem("token");
      if (values.type === "1") {
        const sendData = {
          title: values.title,
          question_quantity: 1,
          start_at: "2023-09-01 21:45:31",
          end_at: "2023-09-19 21:45:31",
        };
        const { data } = await axios.post(
          `${serverApi}multiChoiceQuiz`,
          sendData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       if(values.disease_id){
        const { data  : data2} = await axios.post(
          `${serverApi}multiChoiceQuiz/attachDisease/${data.id}`,
         {disease_id : values.disease_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       }
        setLoading(false);
        toast.success("آزمون با موفقیت ایجاد شد");
        window.location.pathname = `/multiChoiceQuiz/${data.id}`
      } else {
        const sendData = {
          title: values.title,
          start_at: "2023-09-01 21:45:31",
          end_at: "2023-09-19 21:45:31",
        };
        const { data } = await axios.post(
          `${serverApi}descriptiveQuiz`,
          sendData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data  : data2} = await axios.post(
          `${serverApi}descriptiveQuiz/attachDisease/${data.id}`,
         {disease_id : values.disease_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoading(false);
        toast.success("آزمون با موفقیت ایجاد شد");
        window.location.pathname = `/descriptiveQuiz/${data.id}`
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await addNew(values);
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
                ساخت آزمون جدید
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
                    type: "",
                    title: "",
                    disease_id : ""
                  }}
                  validationSchema={""}
                  onSubmit={(values) => {
                    addNew(values);
                  }}
                  enableReinitialize={true}
                >
                  {({
                    isSubmitting,
                    errors,
                    setFieldValue,
                    touched,
                    values,
                    handleChange,
                  }) => (
                    <Form>
                      <div className=" row d-flex align-items-center mt-4 ">
                        <div className="mb-2  col-lg-3 d-flex align-items-center ">
                          <label
                            className=" ms-2  label-form text-nowrap"
                            htmlFor="title"
                          >
                            نام آزمون
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
                        <div className="col-lg-4 d-flex align-items-center">
                          <label className="ms-2 text-nowrap label-form label-form">
                            نوع آزمون:
                          </label>
                          <Field
                            name="type"
                            as="select"
                            className="w-100 form-control"
                          >
                            <option>لطفا یک گزینه انتخاب کنید</option>
                            <option value={1}>چند گزینه ای</option>
                            <option value={2}>چند گزینه ای- تشریحی</option>
                          </Field>
                          <ErrorMessage
                            name="type"
                            component="div"
                            className="field-error"
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
                          list.map((i,index)=>(
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
                      </div>
                      <div className="mb-2 mx-auto col-lg-3">
                        <button
                          className="add-btn btn"
                          type="submit"
                        >
                          {!loading ? "ثبت" : "لطفا منتظر بمانید"}
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

export default QuizModal;
