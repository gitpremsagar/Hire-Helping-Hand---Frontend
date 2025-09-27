export const API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME || "http://localhost:4000";

export const BASE_PATH = `${API_HOSTNAME}/api/v1`;

export const API = {
  CATEGORIES: {
    GET_ALL: `${BASE_PATH}/service-categories`,
  },
  SUBCATEGORIES: {
    GET_ALL: `${BASE_PATH}/service-subcategories`,
  },
}

