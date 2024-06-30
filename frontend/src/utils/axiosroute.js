import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && originalRequest.url === '/refresh') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshtoken');
      if (!refreshToken) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        api.post('/refresh', { refreshtoken: refreshToken })
          .then(({ data }) => {
            const newAccessToken = data.token;
            const newRefreshToken = data.refreshtoken;

            localStorage.setItem('authtoken', newAccessToken);
            localStorage.setItem('refreshtoken', newRefreshToken);

            api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
            processQueue(null, newAccessToken);
            resolve(api(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            setTimeout(() => {
              window.location.href = '/login';
            }, 500);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;

