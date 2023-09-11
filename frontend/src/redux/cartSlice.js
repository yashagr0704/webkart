import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  cartItems: [],
  error: null
}
export const cartAddItem = createAsyncThunk(
  'product/cartAddItem',
  async (payload) => {
    try {
      const { id, qty } = payload
      const { data } = await axios.get(`/api/products/${id}`)
      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty)
      }
    } catch (error) {
      throw new Error(error.response && error.response.data.message ? error.response.data.message : error.message)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartRemoveItem: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(cartAddItem.fulfilled, (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x)
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      state.error = null
    })
    builder.addCase(cartAddItem.rejected, (state, action) => {
      state.error = action.error.message
    })
  }
})

export const { cartRemoveItem } = cartSlice.actions

export default cartSlice.reducer