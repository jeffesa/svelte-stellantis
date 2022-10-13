import { render } from '@testing-library/svelte'
import Icon from './Icon.svelte'

test("when don't send the `name` prop render with 'invalid icon name' text", () => {
	const { getByText } = render(Icon)
	expect(getByText('invalid icon name'))
})

test('render icon `brand` by name', () => {
	const role = 'brand'
	const { getByRole } = render(Icon, { name: role })
	expect(getByRole(role))
})

test('render icon `plus` by name', () => {
	const role = 'plus'
	const { getByRole } = render(Icon, { name: role })
	expect(getByRole(role))
})

test('default `plus` icon is `sm`', () => {
	const role = 'plus'
	const { container } = render(Icon, { name: role })
	expect(container).toMatchSnapshot()
	const $icon = container.querySelector('i')
	expect($icon.classList.contains('sm')).toBeTruthy()
})

test('icon `plus` can be `md`', () => {
	const role = 'plus'
	const { container } = render(Icon, {
		name: role,
		md: true
	})
	expect(container).toMatchSnapshot()
	const $icon = container.querySelector('i')
	expect($icon.classList.contains('md')).toBeTruthy()
})

test('icon `plus` can be `lg`', () => {
	const role = 'plus'
	const { container } = render(Icon, {
		name: role,
		lg: true
	})
	expect(container).toMatchSnapshot()
	const $icon = container.querySelector('i')
	expect($icon.classList.contains('lg')).toBeTruthy()
})

test('icon `plus` can be `orange`', () => {
	const role = 'plus'
	const { container } = render(Icon, {
		name: role,
		orange: true
	})
	expect(container).toMatchSnapshot()
	const $icon = container.querySelector('i')
	expect($icon.classList.contains('orange')).toBeTruthy()
})
