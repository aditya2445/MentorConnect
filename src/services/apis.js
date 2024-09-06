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
    CHECK_MENTOR_API:BASE_URL+"/mentor/checkMentor",
    FETCH_MENTORS_API:BASE_URL+"/mentor/fetchMentors"
}

export const category = {
    CREATE_CATEGORY_API:BASE_URL+"/category/createCategory",
    SHOW_ALL_CATEGORY_API:BASE_URL+"/category/showAllCategory"
}

export const session = {
    CREATE_TIME_SLOTS:BASE_URL+"/session/createTimeSlots",
    GET_TIME_SLOTS:BASE_URL+"/session/getTimeSlots",
    BOOK_SESSION:BASE_URL+"/session/book-session",
    ALL_SESSION:BASE_URL+"/session/all",
    TIME_UPDATES:BASE_URL+"/session/time",
    SESSION_REQUESTS:BASE_URL+"/session/requests",
    ACCEPT_REQ:BASE_URL+"/session/accept",
    REJECT_REQ:BASE_URL+"/session/reject"
}

    export const premium = {
    FETCH_PREMIUMS_API:BASE_URL+"/premium/getAllPremium",
    FETCH_PREMIUMS_DETAILS:BASE_URL+"/premium/getPremiumDetails/",
    CHECK_PURCHASE_STATUS:BASE_URL+"/premium/check-purchase-status"
}

export const payment ={
    CREATE_ORDER:BASE_URL+"/payment/createOrder",
    VERIFY:BASE_URL+"/payment/verify"
}