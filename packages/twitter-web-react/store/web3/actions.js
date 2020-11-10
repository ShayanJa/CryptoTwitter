import { createAction } from '@reduxjs/toolkit'

export const connectWallet = createAction('web3/connect')
export const disconnectwallet = createAction('web3/disconnect')
export const setProvider = createAction('web3/setProvider')
export const updateTweets = createAction('web3/updateTweets')
export const addTweet = createAction('web3/addTweet')
export const tweet = createAction('web3/tweet')
