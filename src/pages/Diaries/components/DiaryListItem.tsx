import React from 'react'
import className from 'classnames'
import { formatDate } from '../../../utils'
import { Diary } from '../../../types/Diary'
import styles from './DiaryListitem.module.css'

const DiaryListItem = ({
  diary,
  isCurrent,
  setCurrentDiary,
}: {
  diary: Diary
  isCurrent: boolean
  setCurrentDiary: (diary: Diary) => void
}) => {
  let diaryText = diary.html.replace( /(<([^>]+)>)/ig, ' ')
  const diaryTextIsEmpty = !diaryText.trim()

  if (diaryTextIsEmpty) {
    diaryText = 'No diary entry found'
  }

  return (
    <button
      className={className(styles.card, { [styles.active]: isCurrent })}
      onClick={() => setCurrentDiary(diary)}
    >
      <h5 className={styles.title}>
        Diary entry from { formatDate.fromNow(diary.createdAt) }
      </h5>
      <p className={styles.content}>
        <span
          className={className({ [styles.emptyDiaryText]: diaryTextIsEmpty })}
        >
          { diaryText }
        </span>
      </p>
      <p className={styles.updateTime}>
        Updated { formatDate.fromNow(diary.updatedAt) }
      </p>
    </button>
  )
}

export default DiaryListItem
