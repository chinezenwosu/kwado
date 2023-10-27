import styled from '@emotion/styled'

export const H4 = styled.h4`
	margin: 0;
	padding-right: 10px;
`

export const Input = styled.input`
	padding: 6px 14px;
	font-size: 14px;
	margin-top: 10px;
	margin-bottom: 10px;
	min-width: 240px;
	outline: none;
	border: 2px solid palevioletred;
	margin-right: auto;
`

export const Button = styled.button`
	padding: 6px 14px;
	display: block;
	outline: none;
	background-color: transparent;
	font-size: 14px;
	text-align: center;
	color: palevioletred;
	white-space: nowrap;
	border: 2px solid palevioletred;
	& + button {
		margin-left: 10px;
	}
`

export const IconButton = styled(Button)((props: any) => ({
	color: props.active ? 'black' : 'grey',
	border: 'none',
	padding: 0,
	cursor: 'pointer',
}))

export const Icon = styled.div``

export const Grid = styled.div`
	display: grid;
	place-items: center;
	grid-template-columns: 1fr;
	@media (max-width: 767px) {
		grid-template-columns: 1fr;
	}
`

export const Title = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	@media (max-width: 767px) {
		flex-wrap: wrap;
	}
`

export const Instance = styled.div<{ online: boolean }>`
	background: ${(props) =>
		props.online ? 'rgba(128, 128, 128, 0.1)' : 'rgba(247, 0, 0, 0.2)'};
	padding: 20px 20px 30px;
	width: 70%;
`

export const ClientFrame = styled.div`
	box-shadow: 2px 2px 4px rgba(128, 128, 128, 0.2);
	padding: 10px;
	min-height: 70px;
	margin-left: -10px;
	margin-right: -10px;
	background: white;
	blockquote {
		border-left: 2px solid #ddd;
		margin-left: 0;
		margin-right: 0;
		padding-left: 10px;
		color: #aaa;
		font-style: italic;
	}
	a {
		color: purple;
		text-decoration: none;
	}
	a:visited {
		color: darkmagenta;
	}
`
