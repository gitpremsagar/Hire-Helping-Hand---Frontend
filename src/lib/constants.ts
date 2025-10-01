export const API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME || "http://localhost:4000";

export const BASE_PATH = `${API_HOSTNAME}/api/v1`;

export const API = {
  CATEGORIES: {
    GET_ALL: `${BASE_PATH}/service-categories`,
    GET_BY_ID: `${BASE_PATH}/service-categories`,
    CREATE: `${BASE_PATH}/service-categories`,
    UPDATE: `${BASE_PATH}/service-categories/:id`,
    DELETE: `${BASE_PATH}/service-categories/:id`,
  },
  SUBCATEGORIES: {
    GET_ALL: `${BASE_PATH}/service-subcategories`,
    GET_BY_ID: `${BASE_PATH}/service-subcategories`,
    CREATE: `${BASE_PATH}/service-subcategories`,
    UPDATE: `${BASE_PATH}/service-subcategories/:id`,
    DELETE: `${BASE_PATH}/service-subcategories/:id`,
  },
  AUTH: {
    GET_REFRESHED_ACCESS_TOKEN: `${BASE_PATH}/auth/refresh-access-token`,
    LOGIN: `${BASE_PATH}/auth/log-in`,
    SIGNUP: `${BASE_PATH}/auth/sign-up`,
    LOGOUT: `${BASE_PATH}/auth/log-out`,
    FORGOT_PASSWORD: `${BASE_PATH}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_PATH}/auth/reset-password`,
    VERIFY_EMAIL: `${BASE_PATH}/auth/verify-email`,
    VERIFY_PHONE: `${BASE_PATH}/auth/verify-phone`,
    ADD_ROLE_TO_USER: `${BASE_PATH}/auth/add-role-to-user`,
    REMOVE_ROLE_FROM_USER: `${BASE_PATH}/auth/remove-role-from-user`,
  },
}

