import React from 'react'
import cn from 'classnames'

import styles from './style.module.css'

import Photo from '../photo'
import { ArrowBottom } from '../icons'
import Button from '../button'
import TextBody from '../text/body'

function ProfileBox({ flat = false, name = 'Shayan', slug = 'Account 0' }) {
  return (
    <Button className={cn([styles.box])}>
      <Photo size={39} />
      {!flat && (
        <>
          <div className={styles.body}>
            <TextBody bold>
              {name.length > 10
                ? `${name.substring(0, 6)}...${name.substring(38, 42)}`
                : name}
            </TextBody>
            <TextBody className={styles.slug}>@{slug}</TextBody>
          </div>
          <ArrowBottom className={styles.icon} />
        </>
      )}
    </Button>
  )
}
export default ProfileBox
