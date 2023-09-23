import axios from "axios";
import Cookies from "js-cookie";
import { APP_NAME } from "../../constant";

const createApi = (baseUrl) => {
  const api = axios.create({
    baseURL: `${
      process.env.REACT_APP_ENV === "local" ? "http://127.0.0.1:8000" : ".."
    }/api/admin/${baseUrl}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
      Currency: Cookies.get("currency") || "TWD",
      webname: APP_NAME,
      isCredit: window.getbaseconfig?.is_credit || 0,
    },
  });
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );
  return api;
};

export const api = createApi("");
export const memberApi = createApi("member");
export const agentApi = createApi("cagent");
export const reportApi = createApi("report");
export const systemApi = createApi("system");
export const cagentTagApi = createApi("cagentTagsMenu");
// export const api = axios.create({
//   baseURL: `../api/admin/`,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: sessionStorage.getItem("token"),
//   },
// });

// export function setAuthInterceptor(api) {
//   api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
//     return config;
//   });

//   api.interceptors.response.use(
//     (response) => response.data,
//     (error) => {
//       console.error(error);
//       return Promise.reject(error);
//     }
//   );
// }

// setAuthInterceptor(api);
