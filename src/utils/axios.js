import axios from 'axios'

//인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000'
  //import.meta.env로 환경변수에 접근가넝
  //import.meta.env.PROD는 앱이 프로덕션에서 실행중인지 여부(boolean)
})

export default axiosInstance