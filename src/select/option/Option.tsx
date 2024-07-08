import SelectedIcon from '../icons/SelectedIcon'
import { SelectOption, Size, Theme } from '../Select'
import cs from './option.module.scss'

interface OptionProps {
	value: SelectOption[]
	option: SelectOption
	handleChangeOption: (o: SelectOption[]) => void
	multiple: boolean
	size: Size
	theme: Theme
}

export const Option: React.FC<OptionProps> = ({
	value,
	option,
	handleChangeOption,
	multiple,
	size,
	theme
}) => {
	const selectOption = (option: SelectOption) => {
		if (multiple) {
			if (value.includes(option)) {
				handleChangeOption(value.filter((o) => o !== option))
			} else {
				handleChangeOption([...value, option])
			}
		} else {
			if (option !== value[0]) handleChangeOption([option])
		}
	}

	return (
		<li
			key={option.value}
			className={[cs.option, cs[size], cs[theme]].join(' ')}
			onClick={() => selectOption(option)}>
			<div className={cs.inner}>
				{option.icon && (
					<img className={cs.icon} src={option.icon} alt={option.value} />
				)}
				<span className={cs.optionLabel}>{option.label}</span>
			</div>
			{value.includes(option) && (
				<div className={cs.optionSelected}>
					<SelectedIcon fill={theme} />
				</div>
			)}
		</li>
	)
}
