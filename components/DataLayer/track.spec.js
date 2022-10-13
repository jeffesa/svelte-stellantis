import { render } from '@testing-library/svelte'
import Track from './Track.svelte'

test('DataLayer/Track:...', () => {
	const { getByText } = render(Track)
	expect(getByText('invalid track name'))
})
