import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage/index'
import LoginPage from './pages/LoginPage/index'
import RegisterPage from './pages/RegisterPage/index'
import Navbar from './layout/Navbar/index'
import Footer from './layout/Footer/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions';
import ProtectedRoutes from './components/ProtectedRoutes'
import ProtectedPage from './pages/ProtectedPage/index';
import NotAuthRoutes from './components/NotAuthRoutes'
import UploadProductPage from './pages/UploadProductPage'
import DetailProductPage from './pages/DetailProductPage'
import CartPage from './pages/CartPage'
import HistoryPage from './pages/HistoryPage'

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <ToastContainer position='bottom-right' theme='light' pauseOnHover autoClose={1500} />
      
      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet /> 
        {/* Outlet 이자리에 경로에 따라서 LandingPage, LoginPage, RegisterPage 컴포넌트가 들어감 */}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const isAuth =  useSelector(state => state.user?.isAuth)
  const { pathname } = useLocation()

  useEffect(()=> {
    if(isAuth) { //로그인 인증된 사람만 체크하면 되니깐 이거 필요 
      dispatch(authUser())
    }
  }, [isAuth, pathname, dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />

        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/protected' element={<ProtectedPage />} />
          <Route path='/product/upload' element={<UploadProductPage />} />
          <Route path='/product/:productId' element={<DetailProductPage />} />
          <Route path='/user/cart' element={<CartPage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Route>

         {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
