import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

import styles from './index.module.css'

import Layout from '../components/layout'
import Tweet from '../components/tweet'
import fetcher from '../lib/fetch'
import Loading from '../components/loading'
import { useTweets } from '../store/web3/hooks'

function HomePage() {
  const [tweets, getTweets] = useTweets()

  useEffect(() => {
    getTweets()
  }, [])
  return (
    <Layout>
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet) => {
          return <Tweet {...tweet}></Tweet>
        })
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </Layout>
  )
}

export default HomePage
