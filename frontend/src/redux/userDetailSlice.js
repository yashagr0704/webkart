import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  user: {},
  error: null
}
export const getUserDetails = createAsyncThunk(
  'userDetail/getUserDetails',
  async (id, { dispatch, getState }) => {
    try {

      const { userLogin: { userInfo } } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
      }

      const { data } = await axios.get(`/api/users/${id}`, config)

      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }

  }
)


export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      return { ...state, loading: true }
    }).addCase(getUserDetails.fulfilled, (state, action) => {
      return { loading: false, user: action.payload }
    }).addCase(getUserDetails.rejected, (state, action) => {
      console.log(action)
      return { loading: false, error: action.error.message }
    })
  }
})



export default userDetailSlice.reducer