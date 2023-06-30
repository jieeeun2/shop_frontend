import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, authUser, logoutUser, addToCart, getCartItems, 
  removeCartItem, payProducts} from './thunkFunctions'
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
      .addCase(authUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload 
        //이게 왜필요한거지 이미 로그인했을때 state값 들어있지않나????? -> 그런식으로 보면 안됨
        //이게 없으면 state를 보면 user>userData>user>여기안에다가 payload가 들어감 
        //백엔드에서는 페이로드가 전해져오는데 넣을위치를 못찾아서 그런가 왜 에러도 안나고 아무데나 들어가고 난리임?????
        state.isAuth = true //이거 사실 여기서 왜 또 해줘야하는지 잘 모르겟음
        //로그인할때 이미 isAuth true로 줘서 필요없는거 아닌가 고새 isAuth가 false로 바뀔 일이 있나????
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.userData = initialState.userData
        state.isAuth = false
        localStorage.removeItem('accessToken')
      })

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

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      }) 
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData.cart = action.payload
        toast.info('장바구니에 추가되었습니다.')
      }) 
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      }) 

      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartDetail = action.payload 
        //action.payload에 담겨져 있는거는 Product collection에다가 quantity속성 추가한거임
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData.cart = action.payload.cart
        state.cartDetail = action.payload.productInfo
        toast.info('상품이 장바구니에서 삭제되었습니다.')
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(payProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(payProducts.fulfilled, (state) => {
        state.isLoading = false
        state.userData.cart = []
        state.cartDetail = []
        toast.info('성공적으로 상품을 구매했습니다')
      })
      .addCase(payProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
        toast.error(action.payload)
      })

  }
})

export default userSlice.reducer