import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, authUser, logoutUser} from './thunkFunctions'
import { toast } from 'react-toastify'

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: ''
  },
  isAuth: false,
  isLoading: false, 
  error: ''
}

const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        toast.info('회원가입을 성공했습니다')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload
        state.isAuth = true
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      .addCase(loginUser.rejected, (state, action)=> {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(authUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false
        // state.userData = action.payload //이게 왜필요한거지 이미 로그인했을때 state값 들어있지않나?????
        // state.isAuth = true //이것도왜지
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.userData = initialState.userData
        state.isAuth = false
        localStorage.removeItem('accessToken')
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.userData = initialState.userData
        state.isAuth = false
        localStorage.removeItem('accessToken')
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })

  }
})

export default userSlice.reducer