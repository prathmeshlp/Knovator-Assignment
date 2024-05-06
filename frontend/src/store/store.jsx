import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/productsAPI'

 export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

