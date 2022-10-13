import { render } from '@testing-library/svelte'
import Image from './Image.svelte'
import { setTimeout } from 'timers'

const SRC_LOAD = 'SRC_LOAD'
const SRC_ERROR = 'SRC_ERROR'
const SRC_NEAR = 'SRC_NEAR'

beforeAll(() => {
	Object.defineProperty(global.Image.prototype, 'src', {
		set(src) {
			if (src === SRC_ERROR) {
				setTimeout(() => this.onerror(new Error('mocked error')))
			} else if (src === SRC_LOAD) {
				setTimeout(() => this.onload({ path: [{ src: '' }] }))
			} else if (src === SRC_NEAR) {
			}
		}
	})
})

test('component assert props', () => {
	const { component } = render(Image, {
		src: SRC_LOAD
	})
	expect(Object.keys(component.$$.props)).toStrictEqual([
		'w',
		'h',
		'min',
		'fit',
		'alt',
		'src',
		'fallback',
		'srcset',
		'sizes'
	])
})

test('dispatch load event on image load', (done) => {
	const { component } = render(Image, {
		src: SRC_LOAD,
		h: '400px'
	})
	component.$on('load', () => done())
})

test('dispatch error event', (done) => {
	const { component } = render(Image, {
		src: SRC_ERROR,
		h: '400px'
	})
	component.$on('error', () => done())
})
