import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './productListSlice';
import productDetailSlice from './productDetailSlice';
import cartSlice from './cartSlice';
import userLoginSlice from './userLoginSlice';
import userRegisterSlice from './userRegisterSlice';
import userDetailSlice from './userDetailSlice';
import userUpdateProfileSlice from './userUpdateProfileSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const store = configureStore({
  reducer: {
    products: productListSlice,
    product: productDetailSlice,
    cart: cartSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userDetail: userDetailSlice,
    userUpdateProfile: userUpdateProfileSlice,
  },
  preloadedState: {
    cart: {
      cartItems: cartItemsFromStorage
    },
    userLogin: {
      userInfo: userInfoFromStorage
    }
  }
})

export default store;