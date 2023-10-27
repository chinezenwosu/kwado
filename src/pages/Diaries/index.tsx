import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getDiaries } from '../../api/editor'
import DiaryList from './components/DiaryList'
import CreateDiary from './components/CreateDiary'
import { routes } from '../../utils'
import styles from './Diaries.module.css'
import { Diary } from '../../types/Diary'

const Diaries = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [currentDiary, setCurrentDiary] = useState<Diary | null>(null)
  const currentDiarySlug = currentDiary?.slug || ''
  const navigate = useNavigate()

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
      handleDiaryChange(response.data[0])
    }
  }

  const handleDiaryChange = (diary: Diary) => {
    setCurrentDiary(diary)
    navigate(routes.getDiary(diary.slug))
  }

  const addDiaryToList = (diary: Diary) => {
    setDiaries((prev) => {
      prev.unshift(diary)
      return prev
    })
  }

  if (!currentDiary) return null

  return (
    <div className={styles.diaries}>
      <div className={`${styles.container} ${styles.diaryListContainer}`}>
        <CreateDiary addDiaryToList={addDiaryToList} />
        <DiaryList
          diaries={diaries}
          currentDiarySlug={currentDiarySlug}
          setCurrentDiary={handleDiaryChange}
        />
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Diaries
