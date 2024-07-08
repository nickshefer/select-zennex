# Многофункциональный компонент выбора

Суть задания: cоздать многофункциональный компонент выбора по аналогии select из HTML.

## Функционал

- Передача массива объектов с указанием для каждого элемента списка его названия, значения и иконки (опционально).

- Параметр для возможности ввода текста с фильтрацией предлагаемых элементов, а не только выбор из списка.

- Настройка стиля компонента (параметр theme и size)

- Параметр для возможности множественного выбора

## Ресурсы

Дизайн - [макет Figma](https://www.figma.com/design/eIywF9ag4XqRwWFORojlzB/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5?node-id=3-9&t=dJTvgnn5TkFl8HCd-0)

## Развернуть локально

- Использовал при разработки React + Vite + TypeScript
- Версия NodeJS: v20.11.0

```bash
git clone https://github.com/nickshefer/select-zennex.git

npm install

npm run dev
```

## Инструкция

```tsx
// Импортируйте компонент Select и тип SelectOption
import { Select, SelectOption } from './select/Select'

const genders = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' }
]

function App() {
	const [value, setValue] = useState<SelectOption[]>([])

	function handleChange(v) {
		return setValue(v)
	}

	return (
		<Select
			options={genders} // Список объектов {label: string, value: string, icon?: string} опций
			value={value} // Текущее состояние выбранных опций
			onChange={handleChange} // Функция изменения выбранных опций
			label='gender'
			placeholder='Select your gender...' // Значение по умолчанию 'Select one or more items...'
			className='select'
			size='sm' // Значение по умолчанию 'lg'
			theme='dark' // // Значение по умолчанию 'light'
		/>
	)
}
```

- Список передаваемых параметров

```ts
interface SelectProps {
	options: SelectOption[]
	value: SelectOption[]
	onChange: (value: SelectOption[]) => void
	multiple?: boolean
	placeholder?: string
	label?: string
	search?: boolean
	size?: Size // 'sm' | 'md' | 'lg'
	theme?: Theme // 'light' | 'dark'
	className?: HTMLDivElement['className']
}
```

- `select/vars.scss`. Переменные цветов

```scss
// Light theme
$bg-light: #fff;
$hover-bg-light: #f1f1f1;
$text-light: #111;
$search-border-color-light: rgba(17, 17, 17, 0.1);
$placeholder-light: rgba(17, 17, 17, 0.48);

// Dark theme
$text-dark: #fff;
$hover-bg-dark: #222222;
$bg-dark: #2c2c2c;
$search-border-color-dark: rgba(255, 255, 255, 0.1);
$placeholder-dark: rgba(255, 255, 255, 0.6);
```
