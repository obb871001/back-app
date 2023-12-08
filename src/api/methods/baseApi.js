import axios from "axios";
import Cookies from "js-cookie";
import { APP_NAME } from "../../constant";
import store from "../../redux/store";

const requestTimestamps = {};

const createApi = (baseUrl, { isFormData = false } = {}) => {
  const api = axios.create({
    baseURL: `${
      process.env.REACT_APP_ENV === "local" ? "https://newams.91url.cc" : ".."
    }/api/admin/${baseUrl}`,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      Authorization: Cookies.get("token"),
      Currency: Cookies.get("currency") || "TWD",
      isCredit: window.getbaseconfig?.is_credit || 0,
    },
  });
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    return config;
  });

  api.interceptors.request.use((config) => {
    const requestKey = `${config.url}_${JSON.stringify(config.params)}`;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (requestTimestamps[requestKey] === currentTimestamp) {
      const cancelSource = axios.CancelToken.source();
      config.cancelToken = cancelSource.token;
      cancelSource.cancel(`取消一樣的請求`);
    } else {
      requestTimestamps[requestKey] = currentTimestamp;
    }
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      if (!axios.isCancel(error)) {
        store.dispatch({ type: "API_ERROR", error: error });
      }
      if (error.response.data.message === "Invalid Authorization") {
        store.dispatch({ type: "USER_LOGOUT" });
      }
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
export const promotionFormDataApi = createApi("promotion", {
  isFormData: true,
});
export const promotionApi = createApi("promotion");
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
