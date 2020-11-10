import { createReducer } from '@reduxjs/toolkit'
import { connectWallet, disconnectWallet, updateTweets } from './actions'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const initialState = {
  tweets: []
}
const INFURA_ID = ''

export default createReducer(initialState, (builder) =>
  builder
    .addCase(connectWallet, async (state, action) => {
      console.log(action.payload)
      state.provider = action.payload
    })
    .addCase(updateTweets, (state, action) => {
      // console.log(action.payload.tweets[0][1])
      state.tweets = action.payload
    })
)
