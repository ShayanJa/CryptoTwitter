import React, { useEffect } from 'react'

import Layout from '../components/layout'
import { useTweets } from '../store/web3/hooks'
import Tweet from '../components/tweet'
import { useDispatch } from 'react-redux'

function ExplorePage() {
  const [tweets, getTweets] = useTweets()
  useEffect(() => {
    console.log('yo')
    getTweets()
  }, [])
  return (
    <Layout>
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet) => {
          return <Tweet {...tweet}></Tweet>
        })
      ) : (
        <div />
      )}
    </Layout>
  )
}

export default ExplorePage
