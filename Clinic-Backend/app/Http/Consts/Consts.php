<?php

namespace App\Http\Consts;

class Consts
{
    const DEFAULT_ROLE = "user";
    const SUPPER_ADMIN_ROLE = "supper_admin";
    const DEFAULT_ROLE_EXISTED = "رول دیفالت قبلا ایجاد شده است.";
    const CHOICE_NOT_CONNECTED_TO_QUESTION = "گزینه به سوالی متصل نشده است.";
    const DEFAULT_ROLE_DONT_EXISTED = "رول دیفالت ایجاد نشده است.";
    const ROUTE_VALIDATION = "باید از این مقادیر برای اسم استفاده کنید.";
    const OTP_SENT = "کد ارسال شد";
    const OTP_NOT_SENT = "کد ارسال نشد. دوباره تلاش کنید.";
    const OTP_NOT_EXPIRED = "تا دو دقیقه از ارسال قبلی نمیتوانید کد جدیدی درخواست دهید.";
    const OTP_EXPIRED = "کد شما منقضی شده است. لطفا درخواست کد جدیدی بدهید.";
    const SUCCESS_LOGIN = "با موفقیت وارد شدید.";
    const AUTHORIZATION_NOT_PASS = "شما به این قسمت دسترسی ندارید.";
    const PERMISSION_NOT_FOUND = "دسترسی مد نظر یافت نشد.";
    const NOT_AUTHENTICATED = "احراز هویت نشدید";
    const UN_SUCCESS_LOGIN = "کد اشتباه است یا منقضی شده است";
    const WRONG_MOBILE_OR_PASSWORD = "موبایل یا رمز عبور اشتباه است";
    const REFRESH_TOKEN_EXPIRED = "تایم رفرش توکن تمام شده است";
    const MEDITATION_TYPE_ENUM_VALIDATION = "in:ADVANCE,BEGINNER";
    const SEX_ENUM_VALIDATION = "in:male,female,other";
    const OTP_VALIDATION = "regex:/^[0-9]{4}$/";
    const EMAIL_VALIDATION = "email|regex:/^[-_a-zA-Z0-9.+!%]*@[a-zA-z]*.[a-zA-Z]*$/";
    const STRING_VALIDATION = "string";
    const ARRAY_VALIDATION = "array";
    const DISEASE_EXISTENCE_VALIDATION = "exists:diseases,id";
    const DISEASE_EXISTENCE_VALIDATION_NAME = "exists:diseases,name";
    const ROLE_EXISTENCE_VALIDATION = "exists:roles,id";
    const USER_EXISTENCE_VALIDATION = "exists:users,id";
    const TICKET_EXISTENCE_VALIDATION = "exists:tickets,id";
    const USER_EXISTENCE_WITH_MOBIlE_VALIDATION = "exists:users,mobile";
    const MULTI_CHOICE_QUESTION_EXISTENCE_VALIDATION = "exists:multi_choice_questions,id";
    const MULTI_CHOICE_QUIZ_EXISTENCE_VALIDATION = "exists:multi_choice_quizzes,id";
    const ITEM_EXISTENCE_VALIDATION = "exists:items,id";
    const INFORMATION_ITEM_EXISTENCE_VALIDATION = "exists:information_items,id";
    const SURVEY_MULTI_CHOICE_QUESTION_EXISTENCE_VALIDATION = "exists:multi_choice_survey_questions,id";
    const DESCRIPTIVE_QUESTION_EXISTENCE_VALIDATION = "exists:descriptive_questions,id";
    const CATEGORY_TICKET_EXISTENCE_VALIDATION = "exists:category_tickets,id";
    const DESCRIPTIVE_QUIZ_EXISTENCE_VALIDATION = "exists:descriptive_quizzes,id";
    const DRUG_STORE_EXISTENCE_VALIDATION = "exists:drug_stores,id";
    const URL_VALIDATION = "url";
    const BOOLEAN_VALIDATION = "boolean";
    const REQUIRED_VALIDATION = "required";
    const POSITIVE_NUMBER_VALIDATION = "numeric|gt:0";
    const TIMESTAMP_VALIDATION = "date_format:Y-m-d H:i:s";
    const NUMERIC_VALIDATION = "numeric";
    const LATITUDE_VALIDATION = "between:-90,90";
    const LONGITUDE_VALIDATION = "between:-180,180";
    const MOBILE_VALIDATION = "regex:/^(09)[0-9]{9}$/";
    const UNIQUE_USER_VALIDATION = "unique:users,mobile";
    const UNIQUE_ROLE_VALIDATION = "unique:roles,name";
    const UNIQUE_ROUTE_VALIDATION = "unique:routes,name";
    const IMAGE_VALIDATION = "base64image|base64max:5000";
    const FILE_VALIDATION = "base64file|base64mimes:png,jpg,jpeg,pdf,mp4,mp3|base64max:5000";
    const EXCEL_VALIDATION = "file|mimes:xlsx|max:5000";
    const USER_NOT_FOUND = "کاربر یافت نشد";
    const DISEASE_NOT_FOUND = "بیماری یافت نشد";
    const ENTERTAINMENT_NOT_FOUND = "سرگرمی یافت نشد";
    const INFORMATION_NOT_FOUND = "دانستی یافت نشد";
    const MEDITATION_NOT_FOUND = "مدیتیشن یافت نشد";
    const CATEGORY_NOT_FOUND = "دسته بندی مهارت زندگی یافت نشد";
    const INFORMATION_CATEGORY_NOT_FOUND = "دسته بندی دانستنی یافت نشد";
    const ITEM_NOT_FOUND = "ایتم دسته بندی مهارت زندگی یافت نشد";
    const INFORMATION_ITEM_NOT_FOUND = "ایتم دسته بندی دانستنی یافت نشد";
    const FACE_TO_FACE_VISIT_NOT_FOUND = "ویزیت یافت نشد";
    const DRUG_STORE_NOT_FOUND = "داروخانه یافت نشد";
    const CEO_SERVICES_NOT_FOUND = "خدمات شرکت یافت نشد";
    const DRUG_NOT_FOUND = "دارو یافت نشد";
    const MULTI_CHOICE_QUIZ_NOT_FOUND = "آزمون چندگزینه ای یافت نشد";
    const CATEGORY_TICKET_NOT_FOUND = "دسته بندی تیکت یافت نشد";
    const TICKET_NOT_FOUND = " تیکت یافت نشد";
    const MESSAGE_NOT_FOUND = "پیام تیکت یافت نشد";
    const POTENTIAL_USER_NOT_FOUND = "کاربر تایید نشده یافت نشد";
    const LEVEL_NOT_FOUND = "سطح بندی ای یافت نشد";
    const DESCRIPTIVE_QUIZ_NOT_FOUND = "آزمون تشریحی ای یافت نشد";
    const SURVEY_NOT_FOUND = "نظرسنجی یافت نشد";
    const MULTI_CHOICE_QUESTION_NOT_FOUND = "سوال چندگزینه ای یافت نشد";
    const MULTI_SURVEY_CHOICE_QUESTION_NOT_FOUND = "سوال چندگزینه ای نظر سنجی یافت نشد";
    const DESCRIPTIVE_QUESTION_NOT_FOUND = "سوال تشریحی ای یافت نشد";
    const CHOICE_NOT_FOUND = "گزینه یافت نشد";
    const SURVEY_CHOICE_NOT_FOUND = "گزینه نظر سنجی یافت نشد";
    const ROLE_NOT_FOUND = "نقش یافت نشد.";
    const ROUTE_NOT_FOUND = "روت یافت نشد.";
}
