import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  product: { reviews: [] },
  error: null
}
export const productDetail = createAsyncThunk(
  'product/productDetail',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }
  }
)

export const productDetailSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productDetail.pending, (state) => {
      return { loading: true, ...state }
    })
    builder.addCase(productDetail.fulfilled, (state, action) => {
      return { loading: false, product: action.payload }
    })
    builder.addCase(productDetail.rejected, (state, action) => {
      return { loading: false, error: action.error.message }
    })
  }
})



export default productDetailSlice.reducer