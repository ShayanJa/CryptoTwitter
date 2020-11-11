import { createReducer } from '@reduxjs/toolkit'
import { connectWallet, disconnectWallet, updateTweets } from './actions'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const initialState = {
  address: '',
  tweets: []
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(connectWallet, (state, action) => {
      state.address = action.payload.address
    })
    .addCase(updateTweets, (state, action) => {
      state.tweets = action.payload
    })
    .addDefaultCase((state, action) => {})
)
