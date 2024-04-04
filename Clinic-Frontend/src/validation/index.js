import * as yup from "yup";

export const DiseaseSchema = yup.object().shape({
  name: yup.string().required("نام بیماری نمی تواند خالی باشد"),
  description: yup.string().required("توضیحات نمی تواند خالی باشد"),
});
export const drugStoreSchema = yup.object().shape({
  name: yup.string().required("نام بیماری نمی تواند خالی باشد"),
  address: yup.string().required("توضیحات نمی تواند خالی باشد"),
});
export const drugSchema = yup.object().shape({
  name: yup.string().required("نام بیماری نمی تواند خالی باشد"),
  drug_stores: yup.array().min(1 , "حداقل یک داروخانه انتخاب کنید").required("داروخانه نمی تواند خالی باشد"),
  diseases: yup.array().min(1 , "حداقل یک بیماری انتخاب کنید").required("بیماری نمی تواند خالی باشد"),
});
export const entiermentSchema = yup.object().shape({
  title: yup.string().required("نام بازی نمی تواند خالی باشد"),
  description: yup.string().required("توضیحات نمی تواند خالی باشد"),
  image : yup.string().required("تصویر نمی تواند خالی باشد"),
  Bazar_link : yup.string().url("لینک وارد شده صحیح نیست").required("لینک نمی تواند خالی باشد"),
  play_store_link: yup.string().url("لینک وارد شده صحیح نیست").required("لینک نمی تواند خالی باشد"),
  app_store_link: yup.string().url("لینک وارد شده صحیح نیست").required("لینک نمی تواند خالی باشد"),
});
export const meditaionSchema = yup.object().shape({
  title: yup.string().required("نام بازی نمی تواند خالی باشد"),
  description: yup.string().required("توضیحات نمی تواند خالی باشد"),
  type : yup.string().required("دسته بندی بازی نمی تواند خالی باشد"),
  file:yup.string().required("فایل  نمی تواند خالی باشد")
});
export const categorySkillSchema = yup.object().shape({
  title: yup.string().required("نام  نمی تواند خالی باشد"),
  image:yup.string().required("فایل  نمی تواند خالی باشد"),
  disease_id:yup.string().required("بیماری  نمی تواند خالی باشد")
});
export const SkillSchema = yup.object().shape({
  title: yup.string().required("نام  نمی تواند خالی باشد"),
  file:yup.string().required("فایل  نمی تواند خالی باشد"),
  description:yup.string().required("توضیحات  نمی تواند خالی باشد"),
  category:yup.string().required("دسته بندی  نمی تواند خالی باشد"),
});

export const usersSchema = yup.object().shape({
  mobile: yup.string().required("شماره موبایل نمی تواند خالی باشد"),
  roleId:yup.string().required("نقش کاربر  نمی تواند خالی باشد"),
  nationality_id:yup.string().required("کدملی  نمی تواند خالی باشد"),
});

export const visitSchema = yup.object().shape({
  full_name: yup.string().required("نام نمی تواند خالی باشد"),
  phone_number: yup.string().required("تلفن نمی تواند خالی باشد"),
  visit: yup.string().required("تاریخ نمی تواند خالی باشد"),
  time: yup.string().required("زمان نمی توان خالی باشد"),
});


export const ticketSchema = yup.object().shape({
  title: yup.string().required("عنوان نمی تواند خالی باشد"),
  content: yup.string().required("توضیحات نمی تواند خالی باشد"),
  category_ticket_id: yup.string().required("دسته بندی نمی تواند خالی باش"),
});