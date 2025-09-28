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
}

