import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { FaTrash, FaPlus } from "react-icons/fa";

const QuizInfo = ({setStatus}) => {
    return (
        <div className="add-box">
        <Formik
          initialValues={{
            type: "",
            aryy: [{ type: "", text: "" }],
            aryy2: [{ text: "", questions: [{ text: "", value: "" }, { text: "", value: "" }] }],
          }}
          validationSchema={""}
          onSubmit={(values, { resetForm }) => {setStatus('result')}}
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
                    htmlFor="name"
                  >
                    {" "}
                    نام آزمون
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
                <div className="mb-2  col-lg-3 d-flex align-items-center ">
                  <label
                    className=" ms-2  label-form text-nowrap"
                    htmlFor="name"
                  >
                    {" "}
                    تعداد سوالات
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
                <div className="col-lg-4 d-flex align-items-center">
                  <label className="ms-2 text-nowrap label-form label-form">
                    {" "}
                    نوع آزمون:{" "}
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
              </div>
              <div className="row">
                {values.type == 1 ? (
                  <div>
                    <FieldArray name="aryy2">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.aryy2.length > 0 &&
                            values.aryy2.map((p, index) => (
                              <div
                                className="row align-items-center mb-2"
                                key={index}
                              >
                                <div className="col-8">
                                  <label
                                    className="ms-2 d-flex label-form"
                                    htmlFor={`aryy2.${index}.text`}
                                  >
                                    متن سوال :
                                  </label>
                                  <Field
                                    name={`aryy2.${index}.text`}
                                    type="text"
                                    className="w-100 form-control"
                                  />
                                  <ErrorMessage
                                    name={`aryy2.${index}.text`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col-2 p-0 ">
                                  <button
                                    type="button"
                                    className="secondary btn"
                                    onClick={() => remove(index)}
                                  >
                                    <FaTrash />
                                  </button>
                                  <button
                                    type="button"
                                    className="secondary btn"
                                    onClick={() =>
                                      push({ text: "", questions: [{ text: "", value: "" }, { text: "", value: "" }] })
                                    }
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                                <div className="row">
                                  <FieldArray
                                    name={`aryy2.${index}.questions`}
                                  >
                                    {({ insert, remove, push }) => (
                                      <div>
                                      <button
                                      type="button"
                                      className="secondary btn"
                                      onClick={() =>
                                        push({
                                          type: "",
                                          text: "",
                                        })
                                      }
                                    >
                                    اضافه کردن گزینه جدید
                                      <FaPlus />
                                    </button>
                                        {values.aryy2[index].questions.length > 0 &&
                                          values.aryy2[index].questions.map(
                                            (p, index2) => (
                                              <div
                                                className="row mt-3 align-items-center mb-2"
                                                key={index2}
                                              >
                                                <div className="col-4 d-flex align-items-center">
                                                  <label
                                                    className="ms-2 d-flex label-form"
                                                    htmlFor={`aryy2.${index}.questions.${index2}.text`}
                                                  >
                                                    گزینه{index2+1}
                                                  </label>
                                                  <Field
                                                    name={`aryy2.${index}.questions.${index2}.text`}
                                                    type="text"
                                                    className="w-100 form-control"
                                                  />
                                                  <ErrorMessage
                                                    name={`aryy2.${index}.text`}
                                                    component="div"
                                                    className="field-error"
                                                  />
                                                </div>
                                                <div className="col-2 d-flex align-items-center">
                                                <label
                                                  className="ms-2 d-flex label-form"
                                                  htmlFor={`aryy2.${index}.questions.${index2}.text`}
                                                >
                                                  امتیاز
                                                </label>
                                                <Field
                                                  name={`aryy2.${index}.questions.${index2}.text`}
                                                  type="text"
                                                  className="w-100 form-control"
                                                />
                                                <ErrorMessage
                                                  name={`aryy2.${index}.text`}
                                                  component="div"
                                                  className="field-error"
                                                />
                                              </div>
                                                <div className="col-1 p-0 ">
                                                  <button
                                                    type="button"
                                                    className="secondary btn"
                                                    onClick={() =>
                                                      remove(index)
                                                    }
                                                  >
                                                    <FaTrash />
                                                  </button>
                                                </div>
                                                <div className="row"></div>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                ) : values.type == 2 ? (
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
                                  <label className="ms-2 d-flex label-form label-form">
                                    نوع سوال :
                                  </label>
                                  <Field
                                    name={`aryy.${index}.type`}
                                    as="select"
                                    className="w-100 form-control"
                                  >
                                    <option>
                                      لطفا یک گزینه انتخاب کنید
                                    </option>
                                    <option>چهار گزینه ای</option>
                                    <option>تشریحی</option>
                                  </Field>
                                  <ErrorMessage
                                    name={`aryy.${index}.type`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col-8">
                                  <label
                                    className="ms-2 d-flex label-form"
                                    htmlFor={`aryy.${index}.text`}
                                  >
                                    متن سوال :
                                  </label>
                                  <Field
                                    name={`aryy.${index}.text`}
                                    type="text"
                                    className="w-100 form-control"
                                  />
                                  <ErrorMessage
                                    name={`aryy.${index}.text`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col-2 p-0 ">
                                  <button
                                    type="button"
                                    className="secondary btn"
                                    onClick={() => remove(index)}
                                  >
                                    <FaTrash />
                                  </button>
                                  <button
                                    type="button"
                                    className="secondary btn"
                                    onClick={() =>
                                      push({ type: "", text: "" })
                                    }
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                ) : (
                  ""
                )}
                <div className="mb-2 mt-3 mx-auto col-lg-3">
                  <button type="submit" className="add-btn btn">ثبت</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
};

export default QuizInfo;