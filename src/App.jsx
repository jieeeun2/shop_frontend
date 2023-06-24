import { Outlet, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/index'
import LoginPage from './pages/LoginPage/index'
import RegisterPage from './pages/RegisterPage/index'
import Navbar from './layout/Navbar/index'
import Footer from './layout/Footer/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    </Routes>
  )
}

export default App
