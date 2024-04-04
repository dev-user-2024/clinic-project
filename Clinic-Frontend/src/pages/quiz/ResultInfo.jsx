import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { handleFileSelect } from "../../Components/uploadFile/uploadFile";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { errorHandeling, refreshToken } from "../../services";
const ResultInfo = () => {
  const { id } = useParams();
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(true)
  const [list,setList] = useState([])
  const [list2,setList2] = useState(1)
  const navigate = useNavigate()

  const submitForm = async (value , index, setFieldValue) => {
    try {
      setLoading(true)
      const sendData = {
        content : value.content,
        max_val : value.max_val,
        min_val : value.min_val,
        multi_choice_quiz_id : id,
        file : value.file
      };
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${serverApi}levelScore`,
        sendData ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFieldValue(`aryy.${index}.status`, true);
      setFieldValue(`aryy.${index}.id`, data.id);
      toast.success("بازه با موفقیت اضافه شد");
      setLoading(false)
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await submitForm(value , index, setFieldValue)
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}multiChoiceQuiz/${id}` ,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        let arry =[]
        data.level_scores.map((i)=>{
          let x =   {           
            max_val : i.max_val,
            min_val : i.min_val,
            file:i.file,
            content: i.content,
            status: true,
            id : i.id
          }
          arry.push(x)
        })
        setList(arry)
       setLoading2(false)
      } catch (err) {
        console.log(err)
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
           await fetchData()
          }
        } else {
          errorHandeling(err);
        }
        setLoading2(false)
      }
    };
    fetchData();
  }, []);

  const confirmDelete = (id, remove, index) => {
    Swal.fire({
      title: "حذف آیتم",
      text: "ایا از حذف این ایتم از سرور مطمین هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        removeListener(id, remove, index);
      }
    });
  };

  const removeListener = async (id, remove, index) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${serverApi}levelScore/${id.id}` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
      remove(index);
    } catch (err) {
      Swal.close();
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
         await removeListener(id,refreshToken,index)
        }
      } else {
        errorHandeling(err);
      }
    }
  };
  return (
    <div className="add-box">
    <div className="m-auto text-center mt-4">
    <PulseLoader
      color="#2c7f75"
      loading={loading2}
      // cssOverride={override}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
      <Formik
        initialValues={{
          aryy: [
            ...list,
            { max_val: "", min_val: "", content: "", file: "", status: false },
          ],
        }}
        validationSchema={""}
        onSubmit={(values, { resetForm }) => {}}
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
            <div className="row">
              <p>ثبت نتایج</p>
              <div>
                <FieldArray name="aryy">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.aryy.length > 0 &&
                        values.aryy.map((p, index) => (
                          <div
                            className="row align-items-center mb-2"
                            key={index}
                          >
                            <div className="col-2">
                              <label
                                className="ms-2 d-flex label-form"
                                htmlFor={`aryy.${index}.min_val`}
                              >
                                بازه
                              </label>
                              <Field
                                name={`aryy.${index}.min_val`}
                                type="number"
                                className="w-100 form-control"
                                disabled={values.aryy[index].status}
                              />
                              <ErrorMessage
                                name={`aryy.${index}.min_val`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col-2">
                              <label
                                className="ms-2 d-flex label-form"
                                htmlFor={`aryy.${index}.max_val`}
                              >
                                تا
                              </label>
                              <Field
                                name={`aryy.${index}.max_val`}
                                type="number"
                                className="w-100 form-control"
                                disabled={values.aryy[index].status}
                              />
                              <ErrorMessage
                                name={`aryy.${index}.max_val`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col-4">
                              <label
                                className="ms-2 d-flex label-form"
                                htmlFor={`aryy.${index}.content`}
                              >
                                توضیحات
                              </label>
                              <Field
                                name={`aryy.${index}.content`}
                                type="text"
                                className="w-100 form-control"
                                disabled={values.aryy[index].status}
                              />
                              <ErrorMessage
                                name={`aryy.${index}.content`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="mb-2 mt-4 col-lg-2 d-flex align-items-center ">
                              <label
                              htmlFor={`aryy.${index}.file`}
                                className="add-btn btn"
                              >
                                <span>آپلود فایل</span>
                              </label>
                              <Field
                              name='ss'
                                type="file"
                                id={`aryy.${index}.file`}
                                style={{ display: "none" }}
                                disabled={values.aryy[index].status}
                                onChange={(e) => {
                                  console.log(index)
                                  handleFileSelect(
                                    e,
                                    setFieldValue,
                                    `aryy.${index}.file`
                                  );
                                }}
                              />
                            </div>
                            <div className="col-2 p-0 ">
                              <button
                                type="button"
                                className="secondary btn"
                                onClick={() => {
                                  if (!values.aryy[index].status) {
                                    remove(index);
                                  } else {
                                    confirmDelete(
                                      values.aryy[index],
                                      remove,
                                      index
                                    );
                                  }
                                }}
                              >
                                <FaTrash />
                              </button>
                             {
                              !values.aryy[index].status && <button
                              type="button"
                              className="add-btn btn"
                              style={{ width: "100px" }}
                              onClick={() => {
                                submitForm(
                                  values.aryy[index],
                                  index,
                                  setFieldValue
                                );
                              }}
                            >
                              {
                                loading ? "منتظر بمانید" : <FaCheck />
                              }
                            </button>
                             }
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="add-btn btn"
                        onClick={() =>
                          push({
                            max_val: "",
                            min_val: "",
                            content: "",
                            file: "",
                            status: false,
                          })
                        
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mb-2 mt-3 mx-auto col-lg-3">
                <button type="button" onClick={()=>{navigate("/quiz")}} className="add-btn btn">
                  پایان
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResultInfo;
