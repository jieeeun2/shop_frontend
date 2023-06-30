import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

export const registerUser = createAsyncThunk(
  'user/registerUser', //이런 액션타입문자열을 typePrefix라고 함
  //여기서부터가 payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/register`, body)
      return response.data //얘가 페이로드
    }catch(error) {
      console.log(error, error.response)
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser', async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/login', body)
      /* 아니 slice에 action.payload가 왜 계속 undefined뜨는거지 
      redux devtools에서는 Promise pending상태여서 왜지 했는데
      await안붙여준거였음;;*/
      return response.data 
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    } 
  }
) 

export const authUser = createAsyncThunk(
  'user/authUser', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/auth')
      return response.data 
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/logout')
      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const addToCart = createAsyncThunk(
  'user/addToCart', async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/cart', body) 
      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const getCartItems = createAsyncThunk(
  'user/getCartItems', async ({cartItemIds, userCart}, thunkAPI) => {
    /* 화면에 장바구니페이지 뿌려주려면 Product Collection을 가져와야하는데
    state.userData.cart에만 quantity값이 있는데 이것도 같이 뿌려줘야함
    그래서 해당하는 Product document를 가져오고 거기에 추가로 quantity속성도 추가한거를
    state에서 관리할껀데 새롭게 state.userData.cartDetail을 만들꺼니깐
    thunk함수 안에서 할꺼는 Product Collection을 가져와서 quantity속성 추가한거를 리턴하면 됨
     */
    try{
      const response = await axiosInstance.get(`/products/${cartItemIds}?type=array`)

      userCart.forEach(cartItem => {
        response.data.forEach((productDetail, index) => {
          if(productDetail._id === cartItem.id) {
            response.data[index].quantity = cartItem.quantity
          }
        })
      })

      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const removeCartItem = createAsyncThunk(
  'user/removeCartItem', async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/users/cart?productId=${productId}`)
      
      response.data.cart.forEach(item => {
        response.data.productInfo.forEach((product, index) => {
          if(product._id === item.id) {
            response.data.productInfo[index].quantity = item.quantity
          }
        })
      })

      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const payProducts = createAsyncThunk(
  'user/payProducts', async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/payment`, body)
      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)