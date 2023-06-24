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
  'user/loginUser', async(body, thunkAPI) => {
    try {
      const response = axiosInstance.post('/users/login', body)
      return response.data 
    }catch(error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    } 
  }
) 
