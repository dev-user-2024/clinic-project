import * as yup from "yup";

export const ticketSchema = yup.object().shape({
  title: yup.string().required("عنوان نمی تواند خالی باشد"),
  content: yup.string().required("توضیحات نمی تواند خالی باشد"),
  category_ticket_id: yup.string().required("دسته بندی نمی تواند خالی باش"),
});
