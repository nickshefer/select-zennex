import cs from './select.module.scss'
import { useEffect, useRef, useState } from 'react'
import { SelectContainer } from './selectContainer/SelectContainer'
import { Dropdown } from './dropdown/Dropdown'

export type Size = 'sm' | 'md' | 'lg'
export type Theme = 'light' | 'dark'

export interface SelectOption {
	label: string
	value: string
	icon?: string
}

interface SelectProps {
	value: SelectOption[]
	onChange: (value: SelectOption[]) => void
	multiple?: boolean
	options: SelectOption[]
	placeholder?: string
	label?: string
	search?: boolean
	size?: Size
	theme?: Theme
	className?: HTMLDivElement['className']
}

export const Select: React.FC<SelectProps> = ({
	multiple = false,
	options,
	value,
	onChange,
	placeholder = 'Select one or more items...',
	label,
	size = 'lg',
	theme = 'light',
	search = false,
	className
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

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

	return (
		<div
			ref={root}
			className={[cs.wrapper, cs[size], cs[theme], className].join(' ')}>
			<SelectContainer
				value={value}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				placeholder={placeholder}
				label={label}
				onChange={onChange}
				size={size}
				theme={theme}
			/>
			<Dropdown
				multiple={multiple}
				search={search}
				isOpen={isOpen}
				value={value}
				onChange={onChange}
				options={options}
				size={size}
				theme={theme}
			/>
		</div>
	)
}
