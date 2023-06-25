import axios from 'axios'

//인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000'
  //import.meta.env로 환경변수에 접근가넝
  //import.meta.env.PROD는 앱이 프로덕션에서 실행중인지 여부(boolean)
})

axiosInstance.interceptors.request.use(function(config){ //요청보내기전에 뭔가 하고싶을때 이렇게
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