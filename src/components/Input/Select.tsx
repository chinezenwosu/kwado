const Select = ({
	defaultValue,
	options,
	className,
}: {
	defaultValue: string
	options: Array<{ value: string; label: string }>
	className: string
}) => {
	return (
		<select className={className} defaultValue={defaultValue}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
