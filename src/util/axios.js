import axios from "axios";

const createAxiosInterceptors = (config) => {
  const instance = axios.create({
    baseURL: "http://ems11api.ati-watt.com",
    timeout: 25000, //超时配置
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImEzNWJjMzM3LTI1MDQtNDUzNS1hOTgzLWVmZjUzOTFjM2E4ZSJ9.MZ5K_t-doBeMgTjBSuVps0s6QptrtgYrzP7SxGtZEy5R5WNZYB1aTJJv7hbtP11G04fTrGK3BsBTSKvOXnSNIA",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
    },
    ...config, // 自定义配置覆盖基本配置
  });
  return instance;
};

const axiosRequest = createAxiosInterceptors();
axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    console.log("response:", response);
    const { data } = response;
    if (data.code !== 200) {
      return Promise.reject(response.data);
    } else if (response.status >= 200 && response.status < 400) {
      return data.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject({
      message: error?.msg,
    });
  }
);

export default axiosRequest;
