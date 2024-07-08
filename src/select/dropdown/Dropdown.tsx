import React, { ChangeEventHandler, useState } from 'react'
import { Option } from '../option/Option'
import { Search } from '../search/Search'
import { SelectOption, Size, Theme } from '../Select'
import cs from './dropdown.module.scss'

interface DropdownProps {
	isOpen: boolean
	search: boolean
	multiple: boolean
	value: SelectOption[]
	onChange: (v: SelectOption[]) => void
	options: SelectOption[]
	size: Size
	theme: Theme
}

export const Dropdown: React.FC<DropdownProps> = ({
	isOpen,
	search,
	multiple,
	value,
	onChange,
	options,
	size,
	theme
}) => {
	const [searchStr, setSearchStr] = useState<string>('')
	const [filteredOptions, setFilteredOptions] =
		useState<SelectOption[]>(options)

	const searchOptions: ChangeEventHandler<HTMLInputElement> = (e) => {
		const str = e.target.value
		setSearchStr(str)
		if (!str) setFilteredOptions(options)
		setFilteredOptions(
			options.filter((o) => {
				if (o.label.toLocaleLowerCase().startsWith(str.toLowerCase())) return o
			})
		)
	}

	return (
		<div
			className={[
				cs.dropdown,
				cs[`dropdown_${size}`],
				cs[`dropdown_${theme}`],
				isOpen ? cs.open : ''
			].join(' ')}>
			{search && (
				<Search
					value={searchStr}
					handleChange={searchOptions}
					size={size}
					theme={theme}
				/>
			)}
			<ul className={cs.options}>
				{filteredOptions.map((e) => (
					<Option
						key={e.value}
						value={value}
						option={e}
						handleChangeOption={onChange}
						multiple={multiple}
						size={size}
						theme={theme}
					/>
				))}
			</ul>
		</div>
	)
}
