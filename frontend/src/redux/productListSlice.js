import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  products: [],
  error: null
}
export const listProducts = createAsyncThunk(
  'products/listProducts',
  async () => {
    try {
      const { data } = await axios.get('/api/products')
      return data
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }
  }
)

export const productListSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, () => {
      return { loading: true, products: [] }
    })
    builder.addCase(listProducts.fulfilled, (state, action) => {
      return { loading: false, products: action.payload }
    })
    builder.addCase(listProducts.rejected, (state, action) => {
      return { loading: false, error: action.error.message, products: [] }
    })
  }
})



export default productListSlice.reducer