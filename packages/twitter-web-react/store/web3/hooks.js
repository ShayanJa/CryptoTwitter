import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTweets } from './actions'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Web3Provider, getDefaultProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

import { addresses, abis } from '../../../contracts'

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

  const getTweets = useCallback(async () => {
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
    console.log(tweets)
    // setTweets(tweets.reverse())
    dispatch(updateTweets(tweets.reverse()))
  }, [dispatch])
  return [tweets, getTweets]
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
}
