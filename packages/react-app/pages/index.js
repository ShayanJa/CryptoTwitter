import React, { useCallback, useEffect, useState } from 'react'

import styles from './index.module.css'

import Layout from '../components/layout'
import Tweet from '../components/tweet'
import Loading from '../components/loading'
import { useTweets, useWalletConnect } from '../store/web3/hooks'

function HomePage() {
  const [tweets, _, getTweets] = useTweets()
  const [address, connectWallet] = useWalletConnect()

  useEffect(() => {
    getTweets(15)
  }, [])

  return (
    <Layout>
      {address ? (
        tweets && tweets.length > 0 ? (
          tweets.map((tweet) => {
            return <Tweet {...tweet}></Tweet>
          })
        ) : (
          <div className={styles.loading}>
            <Loading />
          </div>
        )
      ) : (
        <p>Connect wallet on Kovan</p>
      )}
    </Layout>
  )
}

export default HomePage
