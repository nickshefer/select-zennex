import { ChangeEventHandler } from 'react'
import cs from './search.module.scss'
import { Size, Theme } from '../Select'

interface SearchProps {
	value: string
	handleChange: ChangeEventHandler<HTMLInputElement>
	size: Size
	theme: Theme
}

export const Search: React.FC<SearchProps> = ({
	value,
	handleChange,
	size,
	theme
}) => {
	return (
		<input
			value={value}
			onChange={handleChange}
			type='text'
			className={[cs.search, cs[size], cs[theme]].join(' ')}
			placeholder={'Search...'}
		/>
	)
}
