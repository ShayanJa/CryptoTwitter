import React, { useEffect } from 'react'

import Layout from '../components/layout'
import { useTweets } from '../store/web3/hooks'
import Tweet from '../components/tweet'

function ProfilePage() {
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
        <div />
      )}
    </Layout>
  )
}

export default ProfilePage
