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
  '/user/addToCart', async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/cart', body) 
      return response.data
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const getCartItems = createAsyncThunk(
  '/user/getCartItems', async ({cartItemIds, userCart}, thunkAPI) => {
    try{
      const response = await axiosInstance.get(`/products/${cartItemIds}?type=array`)

      userCart.forEach(cartItem => {
        response.data.forEach((productDetail, index) => {
          if(cartItem.id === productDetail._id){
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
