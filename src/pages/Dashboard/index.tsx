import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDiaries } from '../../api/editor'
import DiaryList from './components/DiaryList'
import CreateDiary from './components/CreateDiary'
import styles from './Dashboard.module.css'

const Diary = () => {
  const [diaries, setDiaries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      return await handleFetchDiaries()
    }

    fetchData()
  }, [])

  const handleFetchDiaries = async () => {
    const response = await getDiaries()

    if (response.data) {
      setDiaries(response.data)
    }
  }

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.container} ${styles.diaryListContainer}`}>
        <CreateDiary />
        <DiaryList diaries={diaries} />
      </div>
      <div className={styles.container}>
        Hey there
      </div>
    </div>
  )
}

export default Diary
