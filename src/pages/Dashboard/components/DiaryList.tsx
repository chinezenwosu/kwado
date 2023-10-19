import React from 'react'
import { routes } from '../../../utils'
import styles from './DiaryList.module.css'

const DiaryList = ({ diaries }) => {
  return (
    <div className={styles.diaryList}>
      {
        diaries.map((diary) => {
          return (
            <Display key={diary._id} diary={diary} />
          )
        })
      }
    </div>
  )
}

const Display = ({ diary }) => {
  const diaryText = diary.html.replace( /(<([^>]+)>)/ig, ' ')

  return (
    <a className={styles.card} href={routes.getDiary(diary.slug)} target='_blank'>
      <p className={styles.content}>
        <span>{ diaryText }</span>
      </p>
    </a>
  )
}

export default DiaryList
