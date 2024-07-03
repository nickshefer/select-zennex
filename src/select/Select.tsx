import cs from './select.module.scss'
import { useEffect, useRef, useState } from 'react'
import ArrowIcon from './icons/ArrowIcon'
import ResetIcon from './icons/Reset'
import SelectedIcon from './icons/SelectedIcon'

export type SelectOption = {
	label: string
	value: string
}

type SelectProps = {
	value: SelectOption[]
	onChange: (value: SelectOption[]) => void
	multiple?: boolean
	options: SelectOption[]
	placeholder?: string
	label?: string
	size?: 'sm' | 'md' | 'lg'
	theme?: 'light' | 'dark'
	search?: boolean

	className?: HTMLDivElement['className']
}

export const Select: React.FC<SelectProps> = ({
	multiple,
	options,
	value,
	onChange,
	placeholder,
	label,
	size = 'lg',
	theme = 'light',
	search = false,
	className
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [searchStr, setSearchStr] = useState<string>('')
	const [filteredOptions, setFilteredOptions] =
		useState<SelectOption[]>(options)

	const root = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (root.current) {
				root.current.contains(e.target as Node) || setIsOpen(false)
			}
		}
		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [])

	const selectOption = (option: SelectOption) => {
		if (multiple) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option))
			} else {
				onChange([...value, option])
			}
		} else {
			if (option !== value[0]) onChange([option])
		}
	}

	const clickReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation()
		onChange([])
	}

	const searchOptions = (str: string) => {
		setSearchStr(str)
		if (!str) setFilteredOptions(options)
		setFilteredOptions(
			options.filter((o) => {
				if (o.label.toLocaleLowerCase().startsWith(str.toLowerCase())) return o
			})
		)
	}

	const getStringValue = (value: SelectOption[]) => {
		return value.map((o) => o.label).join(', ')
	}

	return (
		<div
			ref={root}
			className={[cs.wrapper, cs[`wrapper_${size}`], className].join(' ')}>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className={[
					cs.select,
					cs[`select_${size}`],
					cs[`select_${theme}`]
				].join(' ')}>
				<div className={cs.selectLeft}>
					{label && (
						<div
							className={[
								cs.label,
								cs[`label_${theme}`],
								(isOpen || value.length !== 0) && cs.labelSmall
							].join(' ')}>
							{label}
						</div>
					)}
					{(isOpen || value.length !== 0) && (
						<div className={cs.output}>
							{value.length == 0
								? placeholder || 'Select one or more items...'
								: getStringValue(value)}
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
				<button
					className={[cs.btn, isOpen ? cs.arrowUp : cs.arrowDown].join(' ')}>
					<ArrowIcon fill={theme} />
				</button>
			</div>

			<div
				className={[
					cs.dropdown,
					cs[`dropdown_${size}`],
					cs[`dropdown_${theme}`],
					isOpen ? cs.open : ''
				].join(' ')}>
				{search && (
					<input
						value={searchStr}
						onChange={(e) => searchOptions(e.target.value)}
						type='text'
						className={[
							cs.search,
							cs[`search_${size}`],
							cs[`search_${theme}`]
						].join(' ')}
						placeholder={'Search...'}
					/>
				)}
				<ul className={cs.options}>
					{filteredOptions.map((e) => (
						<li
							key={e.value}
							className={[
								cs.option,
								cs[`option_${size}`],
								cs[`option_${theme}`]
							].join(' ')}
							onClick={() => selectOption(e)}>
							<div className={cs.optionLabel}>{e.label}</div>
							{value.includes(e) && (
								<div className={cs.optionSelected}>
									<SelectedIcon fill={theme} />
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
