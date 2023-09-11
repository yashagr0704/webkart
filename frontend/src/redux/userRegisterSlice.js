import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  userInfo: null,
  error: null
}
export const register = createAsyncThunk(
  'userRegister/register',
  async (payload, { dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post('/api/users', payload, config)
      dispatch({
        type: 'userLogin/login/fulfilled',
        payload: data
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }

  }
)


export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, () => {
      return { loading: true }
    }).addCase(register.fulfilled, (state, action) => {
      return { loading: false, userInfo: action.payload }
    }).addCase(register.rejected, (state, action) => {
      console.log(action)
      return { loading: false, error: action.error.message }
    })
  }
})



export default userRegisterSlice.reducer