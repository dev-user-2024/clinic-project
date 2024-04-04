import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect , useState } from "react";
import { errorHandeling, refreshToken } from "../../services";
const Surveychoices = () => {
  const { id } = useParams();
  const [list,setList] = useState([])
  const navigate = useNavigate()
  const addQuestion =  async(value , index , setFieldValue) => {
    try{
        const sendData = {
            content : value.content,
            survey_id : id,
            choices: value.choices
        }
        const token = localStorage.getItem("token");
        const {data} = await axios.post(`${serverApi}multiChoiceSurveyQuestion` , sendData ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setFieldValue(`arry.${index}.status` , true)
        setFieldValue(`arry.${index}.id` , data.id)
        toast.success("سوال با موفقیت اضافه شد")
    }catch(err){
        console.log(err)
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
            addQuestion(value , index , setFieldValue)
          }
        } else {
          errorHandeling(err);
        }
    }
  }
  const confirmDelete = (id , remove ,index) => {
    Swal.fire({
      title: "حذف سوال",
      text: "ایا از حذف این سوال از سرور مطمین هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        removeListener(id , remove ,index);
      }
    });
  };

  const removeListener = async (id, remove ,index) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${serverApi}multiChoiceSurveyQuestion/${id.id}` ,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      Swal.fire("حذف", " با موفقیت حذف شد", "success");
      remove(index)
    } catch (err) {
      Swal.close();
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          removeListener(id, remove, index)
        }
      } else {
        errorHandeling(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}survey/${id}` , {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        let arry =[]
        data.multi_choice_questions.map((i)=>{
          let x =   {
            type: 1,
            content: i.content,
            status: true,
            choices: i.choices,
            id : i.id
          }
          arry.push(x)
        })
        setList(arry)
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
           await fetchData()
          }
        } else {
          errorHandeling(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          arry: [
            ...list ,
            {
              content: "",
              status: false,
              choices: [{ content: "" }, { content: "" }],
            },
          ],
        }}
        validationSchema={""}
        onSubmit={(values, { resetForm }) => {}}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, setFieldValue, touched, values }) => (
          <Form>
            <div className=" row d-flex align-items-center mt-4 ">
              <div className="mb-2  col-12 d-flex align-items-center ">
                <strong style={{ fontSize: "20px" }}>
                  *لطفا پس از وارد کرد هر سوال با زدن دکمه ثبت سوال را ثبت کنید
                </strong>
              </div>
            </div>
            <div className="row">
              <FieldArray name="arry">
                {({ insert, remove, push }) => (
                  <div>
                    {values.arry.length > 0 &&
                      values.arry.map((p, index) => (
                        <div
                          className="row align-items-center mb-2"
                          key={index}
                        >
                          <div className="col-8">
                            <label
                              className="ms-2 d-flex label-form"
                              htmlFor={`arry.${index}.content`}
                            >
                              متن سوال :
                            </label>
                            <Field
                              name={`arry.${index}.content`}
                              type="content"
                              className="w-100 form-control"
                              disabled = {values.arry[index].status}
                            />
                            <ErrorMessage
                              name={`arry.${index}.content`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col-2 p-0 ">
                            <button
                              type="button"
                              className="secondary btn"
                              onClick={() => {
                                if(!values.arry[index].status){
                                    remove(index)
                                }else{
                                    confirmDelete(values.arry[index] , remove ,index)
                                }
                              }}
                            >
                              <FaTrash />
                            </button>
                           { !values.arry[index].status &&
                            <button
                            type="button"
                            className="add-btn btn"
                            style={{ width: "40px" }}
                            onClick={()=>{addQuestion( values.arry[index] , index , setFieldValue)}}
                          >
                            <FaCheck />
                          </button>
                           }
                          </div>
                          <div className="row">
                            <FieldArray name={`arry.${index}.choices`}>
                              {({ insert, remove, push }) => (
                                <div>
                                  {
                                    !values.arry[index].status && <button
                                    type="button"
                                    className="secondary btn"
                                    onClick={() =>
                                      push({
                                        content: "",
                                      })
                                    }
                                  >
                                    اضافه کردن گزینه جدید
                                    <FaPlus />
                                  </button>
                                  }
                                  <div className="row mt-3 justify-content-between mb-2">
                                    {values.arry[index].choices.length > 0 &&
                                      values.arry[index].choices.map(
                                        (p, index2) => (
                                          <div
                                            className="col-6 d-flex align-items-center mb-2"
                                            key={index2}
                                          >
                                            <div className=" align-items-center">
                                              <label
                                                className="ms-2 d-flex label-form"
                                                htmlFor={`arry.${index}.choices.${index2}.content`}
                                              >
                                                گزینه{index2 + 1}
                                              </label>
                                              <Field
                                                name={`arry.${index}.choices.${index2}.content`}
                                                type="content"
                                                className="w-100 form-control"
                                                disabled = {values.arry[index].status}
                                              />
                                              <ErrorMessage
                                                name={`arry.${index}.content`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>

                                            <div className="col-1 p-0 ">
                                          {
                                            !values.arry[index].status && <button
                                            type="button"
                                            className="secondary btn"
                                            onClick={() => remove(index)}
                                          >
                                            <FaTrash />
                                          </button>
                                          }
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="add-btn btn"
                      onClick={() =>
                        push({
                            content: "",
                          status: false,
                          choices: [{ content: "" }, { content: "" }],
                        })
                      }
                    >
                      سوال جدید
                      <FaPlus />
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-5 d-flex justify-content-center">
      <button
      type="button"
      className="add-btn btn"
      onClick={() => {navigate("/survey")}}
    >
      پایان آزمون
    </button>
      </div>
    </div>
  );
};

export default Surveychoices;
