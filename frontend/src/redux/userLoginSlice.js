import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  userInfo: {},
  error: null
}
export const login = createAsyncThunk(
  'userLogin/login',
  async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post('/api/users/login', payload, config)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }

  }
)


export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('userInfo')
      return {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, () => {
      return { loading: true }
    }).addCase(login.fulfilled, (state, action) => {
      return { loading: false, userInfo: action.payload }
    }).addCase(login.rejected, (state, action) => {
      return { loading: false, error: action.error.message }
    })
  }
})

export const { logout } = userLoginSlice.actions

export default userLoginSlice.reducer