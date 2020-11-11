import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTweets } from './actions'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Web3Provider, getDefaultProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

import { addresses, abis } from '../../../contracts/src'

const INFURA_ID = '73553220c64e4d0aabd2b0a7f1d8f3d3'

export const useProvider = () => {
  const dispatch = useDispatch()
  const provider = useSelector((state) => state.provider)

  /* Open wallet selection modal. */
  const setProvider = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: INFURA_ID
          }
        }
      }
    })
    const newProvider = await web3Modal.connect()
    window.web3.setProvider(newProvider)

    // const provider = new Web3Provider(newProvider)
    // window.web3.setProvider(provider)
    // localStorage.setItem('provider', provider)
    // console.log(provider)
  }, [dispatch])

  return [provider, setProvider]
}

export const useTweets = () => {
  const dispatch = useDispatch()
  const tweets = useSelector((state) => state.web3.tweets)

  const _getUserTweets = useCallback(async () => {
    const _tweets = await getUserTweets()
    dispatch(updateTweets(_tweets.reverse()))
  }, [dispatch])

  const _getTweets = useCallback(
    async (numTweets) => {
      const _tweets = await getTweets(numTweets)
      dispatch(updateTweets(_tweets))
    },
    [dispatch]
  )

  const _sendTweets = useCallback(
    async (txt) => {
      const send = await sendTweet(txt)
      send.wait().then(async () => {
        await _getUserTweets()
      })
    },
    [dispatch]
  )
  const _deleteTweet = useCallback(async (_id) => {
    const send = await deleteTweet(_id)
    send.wait().then(async () => {
      await _getUserTweets()
    })
  })

  return [tweets, _getUserTweets, _getTweets, _sendTweets, _deleteTweet]
}

export const sendTweet = async (txt) => {
  const provider = new Web3Provider(window.web3.currentProvider)
  const signer = await provider.getSigner()

  // send Tweet
  const tweetFactory = new Contract(
    addresses.tweetFactory,
    abis.tweetFactory,
    signer
  )
  const send = await tweetFactory.tweet(txt)
  return send
}

export const deleteTweet = async (id) => {
  const provider = new Web3Provider(window.web3.currentProvider)
  const signer = await provider.getSigner()

  // send Tweet
  const tweetFactory = new Contract(
    addresses.tweetFactory,
    abis.tweetFactory,
    signer
  )
  const send = await tweetFactory.deleteTweet(id)
  return send
}

export const getUserTweets = async () => {
  const provider = new Web3Provider(window.web3.currentProvider)

  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // Get Tweet
  const tweetFactory = new Contract(
    addresses.tweetFactory,
    abis.tweetFactory,
    signer
  )
  const tweetIds = await tweetFactory.getUserTweetIds(address)

  console.log(tweetIds)
  let tweets = []
  for (var id of tweetIds) {
    const tweet = await tweetFactory.getTweet(id)
    tweets.push(tweet)
  }
  return tweets
}

export const getTweets = async (lastNTweets) => {
  const provider = new Web3Provider(window.web3.currentProvider)

  const signer = await provider.getSigner()

  // Get Tweet
  const tweetFactory = new Contract(
    addresses.tweetFactory,
    abis.tweetFactory,
    signer
  )

  const tweetCount = await tweetFactory.getTweetCount()
  let tweets = []
  for (var i = tweetCount; 0 < i && i > tweetCount - lastNTweets; i--) {
    const tweet = await tweetFactory.getTweet(i)
    tweets.push(tweet)
    console.log(tweet)
  }
  return tweets
}
