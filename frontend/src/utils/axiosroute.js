import axios from "axios";
import { useNavigate } from "react-router-dom";
function navigatetologin(){

const navigate = useNavigate()
navigate('/login')
}
export const api = axios.create({
  baseURL:process.env.BASE_URL,
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 403 && originalRequest.url === '/refresh') {
      // Refresh token is expired or invalid
      navigatetologin()
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshtoken"); // Retrieve the refresh token from storage

      try {
        const response = await api.post('/refresh', { refreshtoken: refreshToken });
        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refreshtoken;
        
        localStorage.setItem("authtoken",newAccessToken)
        localStorage.setItem("refreshtoken",newRefreshToken)
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);
      } catch (err) {
        navigatetologin()
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
