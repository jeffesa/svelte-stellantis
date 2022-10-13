import { render, fireEvent } from '@testing-library/svelte'
import Button from './Button.svelte'

test('set a text to button', () => {
	const { getByText } = render(Button, { label: 'foo' })
	expect(getByText('foo')).toBeInTheDocument()
})

test('button default is sm', () => {
	const { container } = render(Button)
	expect(container).toMatchSnapshot()
})

test('the button can be md', () => {
	const { container } = render(Button, { md: true })
	expect(container).toMatchSnapshot()
})

test('the button can be lg', () => {
	const { container } = render(Button, { lg: true })
	expect(container).toMatchSnapshot()
})

test('button dispatch a custom onClick function', async () => {
	const onClick = jest.fn()
	const { container } = render(Button, { onClick })
	const $btn = container.querySelector('button')
	await fireEvent.click($btn)
	expect(onClick).toBeCalled()
})
