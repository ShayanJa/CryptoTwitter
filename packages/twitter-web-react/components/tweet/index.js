import React from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { deleteTweet } from '../../store/web3/hooks'
import styles from './style.module.css'
import Photo from '../photo'
import IconButton from '../button/icon'
import * as Icon from '../icons'

function Tweet({
  id,
  created_at,
  retweet_count,
  favorite_count,
  retweeted,
  favorited,
  message,
  userId
}) {
  // created_at
  // retweet_count
  // favorite_count
  // retweeted
  // favorited
  // text
  // user.name
  // user.profile_image_url_https
  // user.screen_name

  if (userId == '0x0000000000000000000000000000000000000000') {
    return <div />
  }

  return (
    <article className={styles.tweet}>
      {/* avatar */}
      <div className={styles.avatar}>
        {/* <Photo src={user.profile_image_url_https} /> */}
      </div>

      {/* body */}
      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.name}>{userId}</span>{' '}
          {/* <span>@{user.screen_name}</span> ·{' '} */}
          {/* <span>{formatDistanceToNowStrict(new Date(created_at))}</span> */}
        </header>

        <div className={styles.content}>{message}</div>

        <footer className={styles.footer}>
          {/* reply */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Reply />
            </IconButton>
            {false && <span>3</span>}
          </div>

          {/* retweet */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Retweet />
            </IconButton>
            {retweet_count && <span>{retweet_count}</span>}
          </div>

          {/* like */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Like />
            </IconButton>
            {favorite_count && <span>{favorite_count}</span>}
          </div>

          {/* share */}
          <div className={styles.footerButton}>
            <IconButton className={styles.actionButton}>
              <Icon.Share />
            </IconButton>
          </div>
          <div className={styles.footerButton} onClick={() => deleteTweet(id)}>
            <IconButton className={styles.actionButton}>
              <Icon.Close />
            </IconButton>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default Tweet
