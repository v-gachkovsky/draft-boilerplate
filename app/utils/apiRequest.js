import Axios from 'axios';
import { isPlainObject } from 'lodash';

const axios = Axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json',
  transformRequest(data) {
    if (isPlainObject(data)) {
      return JSON.stringify(data);
    }
    return data;
  },
  transformResponse(data) {
    // data comes as string in IE
    if (typeof data === 'string' && data.length) {
      data = JSON.parse(data);
    }
    return data;
  }
});

// TODO: move this logic to sagas when all API requests will be moved to sagas
// response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    const ingoredUrls = ['/signin', '/signup'];
    const { pathname } = window.location;
    // Do something with response error
    if (!ingoredUrls.includes(pathname) && error.response.status === 401) {
      resetAuthHeaders();
      window.location = '/signin';
      localStorage.removeItem('auth');
      return null;
    }
    return Promise.reject(error);
  }
);

export function setAuthHeaders(token) {
  axios.defaults.headers.common['X-User-Token'] = token;
}

export function resetAuthHeaders() {
  delete axios.defaults.headers.common['X-User-Token'];
}

export function get(url, data = {}, options = {}) {
  return axios.get(url, { params: data, ...options });
}

export function post(url, data = {}, options = {}) {
  return axios.post(url, data, options);
}

export function put(url, data = {}, options = {}) {
  return axios.put(url, data, options);
}

export function patch(url, data = {}, options = {}) {
  return axios.patch(url, data, options);
}

export function destroy(url, data = {}, options = {}) {
  return axios.delete(url, data, options);
}
