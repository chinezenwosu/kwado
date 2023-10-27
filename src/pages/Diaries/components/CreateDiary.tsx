import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../utils'
import Button from '../../../components/Button'
import { createDiary } from '../../../api/editor'
import { AddRounded } from '@mui/icons-material'
import styles from './CreateDiary.module.css'
import { Diary } from '../../../types/Diary'

const CreateDiary = ({
	addDiaryToList,
}: {
	addDiaryToList: (diary: Diary) => void
}) => {
	const navigate = useNavigate()

	const handleCreateDiary = async () => {
		const response = await createDiary()

		if (response.data) {
			addDiaryToList(response.data)
			navigate(routes.getDiary(response.data.slug))
		}
	}

	return (
		<Button className={styles.button} onClick={handleCreateDiary}>
			<AddRounded />
			Create new diary
		</Button>
	)
}

export default CreateDiary
