import axios from "axios";

export const api = axios.create({
  baseURL:process.env.BASE_URL,
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && originalRequest.url === '/refresh') {
      setTimeout(() => {
      window.location.href="/login"
      }, 500);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshtoken");

      try {
        const response = await api.post('/refresh',{refreshtoken:refreshToken});
        console.log(response)
        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refreshtoken;
        
        localStorage.setItem("authtoken",newAccessToken)
        localStorage.setItem("refreshtoken",newRefreshToken)
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);
      } catch (err) {
setTimeout(() => {
      window.location.href="/login"
      }, 500)
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
