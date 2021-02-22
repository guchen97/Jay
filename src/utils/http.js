import axios from "axios";
import baseURL from "@/config";

// 创建实例
axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: localStorage.getItem("token") || ""
  }
});

// 请求拦截
axios.interceptors.request.use(
  config => config,
  error => { return Promise.reject(error) } 
);

// 响应拦截
axios.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  error => {
    errorHandle(error)
    return Promise.reject(error)
  },
);

// 错误处理
const errorHandle = (err) => {
  // 判断服务期是否响应
  if(err.response){
    switch (err.response.status) {
      // 用户无权限访问
      case 401:
        console.log('请先登录');
        break;
      // token过期
      case 403:
        console.log('登录过期，请重新登录');
        localStorage.removeItem('token')
        break;
      // 请求的资源不存在
      case 404:
        console.log('请求的资源不存在');
        break;
      // 服务期错误
      case 500:
        console.log('服务期异常，请稍后再试');
        break;
      // 其它错误
      default:
        console.log(err.response.data.message);
        break;
    }
  }else if(err.code === 'ECONNABORTED' || err.message === 'Network Error' || err.message.includes('timeout') || !window.navigator.onLine){
    // 超时或者断网
    console.log('网络异常，请检查你的网络连接');
  }else{
    // 其它
    console.log(err.stack);
  }
}
