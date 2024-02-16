import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axiosInstance.interceptors.request.use(function(config){
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
  return config 
}, function(error){
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function(response){ //token 만료되었을때 처리
  return response
}, function(error) {
  if(error.response.data === 'jwt expired') {
    window.location.reload() 
  }
  return Promise.reject(error)
})

export default axiosInstance