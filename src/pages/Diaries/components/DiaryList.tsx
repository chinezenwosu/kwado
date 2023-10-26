import React from 'react'
import DiaryListItem from './DiaryListItem'
import { Diary } from '../../../types/Diary'
import styles from './DiaryList.module.css'

const DiaryList = ({
  diaries,
  currentDiarySlug,
  setCurrentDiary,
}: {
  diaries: Diary[],
  currentDiarySlug: string,
  setCurrentDiary: (diary: Diary) => void,
}) => {
  return (
    <div className={styles.diaryList}>
      {
        diaries.map((diary) => {
          return (
            <DiaryListItem
              key={diary.slug}
              diary={diary}
              isCurrent={diary.slug === currentDiarySlug}
              setCurrentDiary={setCurrentDiary}
            />
          )
        })
      }
    </div>
  )
}

export default DiaryList
