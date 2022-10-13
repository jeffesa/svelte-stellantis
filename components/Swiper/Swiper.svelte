<script context="module">
	export const SWIPER = {}
</script>

<script>
	import { writable } from 'svelte/store'
	import { createEventDispatcher, setContext, onMount } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { quintIn } from 'svelte/easing'
	import { pannable } from '~/lib'

	export let styles = ''
	export let items = []
	export let showTip = false
	export let startOnIndex = 0

	const dispatch = createEventDispatcher()
	let totalSize = 0
	let childSize = 0
	let lastCursorX = 0
	const lastIndex$ = writable(0)
	const activeIndex$ = writable(0)
	const highestActiveIndex$ = writable(0)
	const axisTotal$ = writable(0)
	const axis$ = writable(0)

	export function goto(index) {
		if (index !== $activeIndex$) {
			swipe(index)
		}
	}

	onMount(() => {
		if (startOnIndex !== 0) {
			goto(startOnIndex)
		}
	})

	setContext(SWIPER, {
		activeIndex$: activeIndex$,
		axis$,
		goto
	})

	let swiperEl
	let moviment = {
		minimalToNext: 0.2,
		minimalToPrev: 0.8,
		isRight: false,
		isLeft: false,
		isToResetToBegin: false,
		isToResetToEnd: false,
		toRight() {
			this.isRight = true
			this.isLeft = false
		},
		toLeft() {
			this.isLeft = true
			this.isRight = false
		},
		onSwipeResetToBegin() {
			this.isToResetToBegin = true
			this.isToResetToEnd = false
		},
		onSwipeResetToEnd() {
			this.isToResetToEnd = true
			this.isToResetToBegin = false
		},
		reset() {
			this.isToResetToBegin = false
			this.isToResetToEnd = false
		}
	}

	const updateSizes = () => {
		if (childSize === 0 || totalSize === 0) {
			const sizes = getTotalAndChildSizes()
			totalSize = sizes[0]
			childSize = sizes[1]
		}
	}

	function handlePanstart({ detail: { cursorX } }) {
		dispatch('panstart')
		lastCursorX = cursorX
		updateSizes()
	}

	function handlePanmove({ detail: { cursorDistanceX: dx, cursorX } }) {
		const accidentalTouch = lastCursorX - cursorX
		const isAccidentalTouch =
			(accidentalTouch > 0 && accidentalTouch <= 20) ||
			(accidentalTouch < 0 && accidentalTouch >= -20)

		if (isAccidentalTouch) {
			return
		}

		dispatch('panmove')

		const axisNow = dx + $axisTotal$

		if (dx >= 0 && $axis$ >= 0) {
			moviment.onSwipeResetToBegin()

			if (childSize / 2 <= dx) {
				return
			}
		}

		if (axisNow * -1 > totalSize - childSize) {
			moviment.onSwipeResetToEnd()

			if (axisNow * -1 > totalSize - childSize / 2) {
				return
			}
		}

		if (axisNow < $axis$) {
			moviment.toRight()
		} else {
			moviment.toLeft()
		}

		axis$.set(axisNow)
	}

	function handlePanend(evt) {
		dispatch('panend', evt.detail)

		if (moviment.isToResetToBegin) {
			return automaticMoviment(0)
		}

		if (moviment.isToResetToEnd) {
			return automaticMoviment(items.length - 1)
		}

		const relativeFrameValue = (childSize * 100) / totalSize
		const relativeMoviment = ($axis$ * -1 * 100) / totalSize
		const relativeFromFully = relativeMoviment / relativeFrameValue
		const decimalPartToMove = moviment.isRight ? moviment.minimalToNext : moviment.minimalToPrev

		let movimentBase = baseToNext(relativeFromFully)

		if (relativeFromFully % 1 < decimalPartToMove) {
			movimentBase = baseToDown(relativeFromFully)
		}

		automaticMoviment(movimentBase)
	}

	const getXMovimentBy = (index) => {
		updateSizes()

		let x = childSize * index * -1
		if (index === items.length) {
			x = (totalSize - childSize) * -1
		}

		return x
	}

	const swipe = (index, nodispatch) => {
		const x = getXMovimentBy(index)
		const animation$ = tweened($axis$, { easing: quintIn })

		axisTotal$.set(x)
		lastIndex$.set($activeIndex$)
		activeIndex$.set(index)
		
		if ($lastIndex$ !== $activeIndex$) dispatch('swipe', {
			index: $activeIndex$,
			next: moviment.isRight,
			prev: moviment.isLeft,
			begin: moviment.isToResetToBegin,
			end: moviment.isToResetToEnd
		})
			
		animation$.subscribe((x) => axis$.set(x))
		animation$.set(x)

		// used for lazy. only imagens already swiped
		if (index > $highestActiveIndex$) {
			highestActiveIndex$.set(index)
		}
	}

	const automaticMoviment = (index) => {
		swipe(index, false)
		moviment.reset()
	}

	const baseToNext = (relative) => Math.ceil(relative)
	const baseToDown = (relative) => Math.floor(relative)

	const getTotalAndChildSizes = () => {
		const [childEl] = swiperEl.children
		const { marginLeft, marginRight } = window.getComputedStyle(childEl)
		const { gridColumnGap } = window.getComputedStyle(swiperEl)
		const gap = parseFloat(marginLeft) + parseFloat(marginRight) + (parseFloat(gridColumnGap) || 0)
		const childSize = childEl.getBoundingClientRect().width + gap
		const totalSize = swiperEl.children.length * childSize

		return [totalSize, childSize]
	}

  $: console.log($highestActiveIndex$)
</script>

<style>
	.__swiper {
		touch-action: pan-y;
		user-select: none;
		-webkit-user-drag: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		height: var(--height, auto);
	}

	.multiple {
		@apply flex transition-transform duration-1000 overflow-x-hidden;
	}
</style>

<div
	style="{styles}"
	class="__swiper {$$props.class || ''}"
	class:multiple="{items.length}"
	bind:this="{swiperEl}"
	use:pannable
	on:panstart="{handlePanstart}"
	on:panmove="{handlePanmove}"
	on:panend="{handlePanend}"
>
	{#if items.length}
		{#each items as item, index}
			{#if item}
				<slot
					prop="{{ index: index, isSwiped: index <= $highestActiveIndex$ || $activeIndex$ + 1 === index, data: item }}"
				/>
			{/if}
		{/each}
	{:else}
		<slot />
	{/if}
</div>