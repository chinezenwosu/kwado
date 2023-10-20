import React from 'react'
import { formatDate, routes } from '../../../utils'
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
  let diaryText = diary.html.replace( /(<([^>]+)>)/ig, ' ')
  let diaryTextClass = ''

  if (!diaryText.trim()) {
    diaryText = 'No diary entry found'
    diaryTextClass = styles.emptyDiaryText
  }

  return (
    <a className={styles.card} href={routes.getDiary(diary.slug)} target='_blank'>
      <h5 className={styles.title}>
        Diary entry from { formatDate.fromNow(diary.createdAt) }
      </h5>
      <p className={styles.content}>
        <span className={diaryTextClass}>{ diaryText }</span>
      </p>
      <p className={styles.updateTime}>
        Updated { formatDate.fromNow(diary.updatedAt) }
      </p>
    </a>
  )
}

export default DiaryList
