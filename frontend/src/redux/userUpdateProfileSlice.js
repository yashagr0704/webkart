import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  userInfo: null,
  error: null
}
export const updateUserProfile = createAsyncThunk(
  'userUpdateProfileSlice/register',
  async (user, { getState }) => {
    try {
      const { userLogin: { userInfo } } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
      }
      const { data } = await axios.put('/api/users/profile', user, config)

      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }

  }
)


export const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfileSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.pending, () => {
      return { loading: true }
    }).addCase(updateUserProfile.fulfilled, (state, action) => {
      return { loading: false, success: true, userInfo: action.payload }
    }).addCase(updateUserProfile.rejected, (state, action) => {
      console.log(action)
      return { loading: false, error: action.error.message }
    }).addDefaultCase(state => state)
  }
})



export default userUpdateProfileSlice.reducer