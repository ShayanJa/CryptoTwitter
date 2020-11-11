import { configureStore } from '@reduxjs/toolkit'
import web3 from './web3/reducer'

const store = configureStore({
  reducer: {
    web3
  }
})

export default store
