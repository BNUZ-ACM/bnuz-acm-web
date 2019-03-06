/*
 * @Author: yhy
 * @Date: 2018-07-24 12:52:07
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-06 10:28:54
 */
// base.js
// 封装axios，为api提供基本方法
import axios from 'axios'
import config from '../../config'

// 设置请求baseURL
axios.defaults.baseURL = config.httpUrl();
axios.defaults.timeout = 6000;

// 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

// 使用拦截器统一给请求加上token
axios.interceptors.request.use(
  config => {
    var token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    return Promise.reject(err);
  }
)

// 带cookie请求
// axios.defaults.withCredentials = true

// 使用formdata形式请求
var formConfig = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

  // POST,PUT,DELETE 请求发送前处理request的数据，默认是json格式，这里处理为表单数据格式
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
  }]
}

// 以下为用formdata形式请求的接口
export const formGet = (url, data = {}, token = null) => {
  let queryString = '?'
  for (let k in data) {
    queryString += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  let newUrl = url + (queryString.length === 1 ? '' : queryString.substring(0, queryString.length - 1))
  
  formConfig.headers.Authorization = token;
  return axios.get(newUrl, formConfig)
}

export const formPost = (url, data, token = null) => {
  formConfig.headers.Authorization = token;

  return axios.post(url, data, formConfig);
}

export const filePost = (url, data, params = {}) => {
  let param = '?'
  for (let k in params) {
    param += encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + '&';
  }
  url = url + (param.length === 1 ? '' : param.substring(0, param.length - 1));
  return axios.post(url, data);
}

export const formDel = (url, data) => {
  let queryString = '?'
  for (let k in data) {
    queryString += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  let newUrl = url + (queryString.length === 1 ? '' : queryString.substring(0, queryString.length - 1))
  return axios.delete(newUrl, formConfig)
}

// 以下为用json形式请求的接口
export const jsonPost = (url, data, param) => {
  let config = {
    params: param
  }
  return axios.post(url, data, config)
}

export const jsonPut = (url, data, param) => {
  let config = {
    params: param
  }
  return axios.put(url, data, config)
}

export const getBaseUrl = () => {
  return axios.defaults.baseURL
}
