import React, { Key } from 'react'
import { Quill } from 'react-quill'
import { Select } from '../../../components/Input'
import { formatString } from '../../../utils'
import styles from './Toolbar.module.css'

const TOOLBAR_ID = 'toolbar'
const Size = Quill.import('attributors/style/size')
const Font = Quill.import('formats/font')

Size.whitelist = [
	'8pt',
	'9pt',
	'10pt',
	'11pt',
	'12pt',
	'14pt',
	'16pt',
	'18pt',
	'24pt',
	'30pt',
	'36pt',
	'48pt',
	'60pt',
	'72pt',
	'96pt',
]

Font.whitelist = [
	'arial',
	'comic-sans',
	'courier-new',
	'georgia',
	'helvetica',
	'lucida',
]

Quill.register(Size, true)
Quill.register(Font, true)

const formatOptions = [
	[
		{ name: 'undo', custom: true },
		{ name: 'redo', custom: true },
	],
	[
		{
			name: 'header',
			value: '3',
			options: ['Heading', 'Subheading', 'Normal text'].map((label, value) => {
				return { value: ++value, label }
			}),
		},
		{
			name: 'font',
			value: 'arial',
			options: Font.whitelist.map((value: string) => {
				return { value, label: formatString.hyphenToUpperCamelCase(value) }
			}),
		},
		{
			name: 'size',
			value: '16pt',
			options: Size.whitelist.map((value: string) => {
				return { value, label: value.replace(/pt/g, '') }
			}),
		},
	],
	[
		{ name: 'bold' },
		{ name: 'italic' },
		{ name: 'underline' },
		{ name: 'color' },
	],
	[
		{ name: 'align' },
		{ name: 'list', value: 'ordered' },
		{ name: 'list', value: 'bullet' },
		{ name: 'indent', value: '-1' },
		{ name: 'indent', value: '+1' },
	],
	[{ name: 'link' }, { name: 'image' }],
]

type ButtonOption = {
	name: string
	value?: string
	custom?: boolean
	options?: Array<{ value: string; label: string }>
}

const customTools = {
	undo: (
		<button className="ql-undo">
			<svg viewBox="0 0 18 18">
				<polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
				<path
					className="ql-stroke"
					d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
				/>
			</svg>
		</button>
	),
	redo: (
		<button className="ql-redo">
			<svg viewBox="0 0 18 18">
				<polygon
					className="ql-fill ql-stroke"
					points="12 10 14 12 16 10 12 10"
				/>
				<path
					className="ql-stroke"
					d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
				/>
			</svg>
		</button>
	),
}

const Toolbar = () => (
	<div className={styles.toolbarContainer}>
		<div id={TOOLBAR_ID} className={styles.toolbar}>
			{formatOptions.map((buttons) => {
				return buttons.map((button: ButtonOption, index: Key) => {
					let tool = (
						<button className={`ql-${button.name}`} value={button.value} />
					)

					if (button.custom) {
						tool = customTools[button.name as keyof typeof customTools]
					}

					if (button.options) {
						tool = (
							<Select
								className={`ql-${button.name}`}
								defaultValue={button.value || ''}
								options={button.options}
							/>
						)
					}

					return (
						<span
							key={index}
							className={`${styles.toolContainer} ${
								index === 0 ? styles.toolDivider : ''
							}`}
						>
							{tool}
						</span>
					)
				})
			})}
		</div>
	</div>
)

const toolbarModules = {
	container: `#${TOOLBAR_ID}`,
	handlers: {
		undo: function () {
			const instance = (this as any).quill
			instance.history.undo()
		},
		redo: function () {
			const instance = (this as any).quill
			instance.history.redo()
		},
	},
}

export default Toolbar
export { toolbarModules }
