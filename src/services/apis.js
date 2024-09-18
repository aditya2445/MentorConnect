const BASE_URL= "http://localhost:3000/api/v1"

export const auth = {
    SIGNUP_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login",
    GET_USER_DETAILS:BASE_URL+"/auth/getUserDetails",
    CONTACT_US_API:BASE_URL+"/auth/contact-us",
    GET_ALL_USERS:BASE_URL+"/auth/getAllUsers",
    GET_MY_MENTORS:BASE_URL+"/auth/myMentors",
    GET_MY_MENTEES:BASE_URL+"/auth/myMentees"

}

export const mentor = {
    MENTOR_APP_API:BASE_URL+"/mentor/mentorApp",
    CHECK_MENTOR_API:BASE_URL+"/mentor/checkMentor",
    FETCH_MENTORS_API:BASE_URL+"/mentor/fetchMentors",
    GET_ALL_APPS:BASE_URL+"/mentor/getAllMentorsApp",
    ACCEPT_MENTOR:BASE_URL+"/mentor/AcceptMentor",
    REJECT_MENTOR:BASE_URL+"/mentor/RejectMentor",
    TOP_MENTOR:BASE_URL+"/mentor/topMentors",

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
    CHECK_PURCHASE_STATUS:BASE_URL+"/premium/check-purchase-status",
    DELETE_PREMIUM:BASE_URL+"/premium/delete-premium/:premiumId",
    MY_PREMIUMS:BASE_URL+"/premium/getInstructorPremiums",
    CREATE_PREMIUM_API:BASE_URL+"/premium/createPremium"
}

export const payment ={
    CREATE_ORDER:BASE_URL+"/payment/createOrder",
    VERIFY:BASE_URL+"/payment/verify"
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  }