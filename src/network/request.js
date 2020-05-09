import axios from 'axios';

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    //baseUrl会自动加在url前面，不过若其是URI就不会加
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  },error => console.log(error));

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data;
    },err=>console.log(err));


  return instance(config);
}
