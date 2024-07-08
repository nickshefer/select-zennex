import { useState } from 'react'
import { Select, SelectOption } from './select/Select'
import au from './assets/au.svg'
import de from './assets/de.svg'
import gb from './assets/gb.svg'
import br from './assets/br.svg'
import ru from './assets/ru.svg'

const colors = [
	{ label: 'Yellow', value: 'yellow' },
	{ label: 'Blue', value: 'blue' },
	{ label: 'Black', value: 'black' },
	{ label: 'Red', value: 'red' },
	{ label: 'Green', value: 'green' }
]

const countries = [
	{ label: 'Russia', value: 'ru', icon: ru },
	{ label: 'Australia', value: 'au', icon: au },
	{ label: 'Brasil', value: 'br', icon: br },
	{ label: 'Great Britain', value: 'gb', icon: gb },
	{ label: 'Germany', value: 'de', icon: de }
]

const genders = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' }
]

function App() {
	const [value1, setValue1] = useState<SelectOption[]>([])
	const [value2, setValue2] = useState<SelectOption[]>([])
	const [value3, setValue3] = useState<SelectOption[]>([])

	return (
		<>
			<div className='container'>
				<h1 className='title'>Многофункциональный компонент выбора</h1>
				<Select
					options={genders}
					value={value1}
					onChange={(v) => setValue1(v)}
					label='gender'
					placeholder='Select your gender...'
					className='select'
					size='sm'
				/>
				<Select
					multiple
					options={countries}
					value={value2}
					onChange={(v) => setValue2(v)}
					label='Countries'
					placeholder='Select countries...'
					className='select'
					size='md'
					theme='dark'
					search
				/>
				<Select
					multiple
					options={colors}
					value={value3}
					onChange={(v) => setValue3(v)}
					label='Colors'
					placeholder='Select colors...'
					className='select'
					size='lg'
				/>
			</div>
		</>
	)
}

export default App
