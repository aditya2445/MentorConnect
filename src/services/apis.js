const BASE_URL= "http://localhost:3000/api/v1"

export const auth = {
    SIGNUP_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login",
    GET_USER_DETAILS:BASE_URL+"/auth/getUserDetails",
    CONTACT_US_API:BASE_URL+"/auth/contact-us"
}

export const mentor = {
    MENTOR_APP_API:BASE_URL+"/mentor/mentorApp",
    CHECK_MENTOR_API:BASE_URL+"/mentor/checkMentor"
}

export const category = {
    CREATE_CATEGORY_API:BASE_URL+"/category/createCategory",
    SHOW_ALL_CATEGORY_API:BASE_URL+"/category/showAllCategory"
}

export const session = {
    CREATE_TIME_SLOTS:BASE_URL+"/session/createTimeSlots",
    GET_TIME_SLOTS:BASE_URL+"/session/getTimeSlots"
}