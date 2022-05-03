import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios' 
import { getToken } from '@/utils/auth.ts'
import { message } from 'ant-design-vue';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_WEB_URL,
  timeout: 5000,
  withCredentials: true
};

class Request{
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig){
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        if(getToken()){
          config.headers.Authorization = getToken();
        }

        return config;
      },
      (error) => {
        return error;
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if(res.data.ok === false){
          message.error(res.data.message);
        }
        return res.data;
      },
      (error) => {
        message.error("发生未知错误，请联系管理员。");
        return error;
      }
    )
  }
  request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res)=>{
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
  get<T>(config: AxiosRequestConfig<T>): Promise<T>{
    return this.request<T>({ ...config, method: 'GET'});
  }
  post<T>(config: AxiosRequestConfig<T>): Promise<T>{
    return this.request({ ...config, method: 'POST'});
  }
}

const service = new Request(config)


export default service;

