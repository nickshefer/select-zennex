import { SelectOption, Size, Theme } from '../Select'
import cs from './selectContainer.module.scss'
import ResetIcon from '../icons/Reset'
import ArrowIcon from '../icons/ArrowIcon'

interface SelectContainerProps {
	value: SelectOption[]
	isOpen: boolean
	setIsOpen: (v: boolean) => void
	placeholder: string
	label?: string
	onChange: (v: SelectOption[]) => void
	size: Size
	theme: Theme
}

export const SelectContainer: React.FC<SelectContainerProps> = ({
	value,
	isOpen,
	setIsOpen,
	placeholder,
	label,
	onChange,
	size,
	theme
}) => {
	const clickReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation()
		onChange([])
	}

	const getOutputValue = (value: SelectOption[]) => {
		return value.map((item: SelectOption) => {
			return (
				<div key={item.value} className={cs.outputItem}>
					{item.icon && <img src={item.icon} />}
					<span className={cs.outputText}>{item.label}</span>
				</div>
			)
		})
	}

	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={[cs.select, cs[size], cs[theme]].join(' ')}>
			<div className={cs.selectLeft}>
				{label && (
					<div
						className={[
							cs.label,
							cs[theme],
							(isOpen || value.length !== 0) && cs.labelSmall
						].join(' ')}>
						{label}
					</div>
				)}
				{(isOpen || value.length !== 0) && (
					<div className={cs.output}>
						{value.length == 0 ? placeholder : getOutputValue(value)}
					</div>
				)}
			</div>
			{value.length !== 0 && (
				<button
					onClick={(e) => clickReset(e)}
					className={[cs.btn, cs.reset].join(' ')}>
					<ResetIcon fill={theme} />
				</button>
			)}
			<button className={[cs.btn, !isOpen && cs.arrowDown].join(' ')}>
				<ArrowIcon fill={theme} />
			</button>
		</div>
	)
}
