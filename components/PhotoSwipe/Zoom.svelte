<script>
	import { getContext } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { quintIn } from 'svelte/easing'
	import { pannable } from '~/lib'
	import { PHOTOSWIPE } from './PhotoSwipe.svelte'

	export let scale = 2

	const ctx = getContext(PHOTOSWIPE)

  const zoomWheel = scale / 4
	let isZoomOpened = false
	let initialZoom = 1

	const zoom$ = tweened(initialZoom, {
		easing: quintIn
	})
	const axis$ = tweened({ x: 0, y: 0 }, { duration: 100 })

	const lastAxis = { x: 0, y: 0 }

  const resetAxisWithDelay = (delay = 1000) => {
  	setTimeout(() => {
			axis$.set({ x: 0, y: 0 })
			lastAxis.x = 0
			lastAxis.y = 0
		}, delay)
  }

  // TODO start on axis click
	export function zoomIn(axis = { x: 0, y: 0 }) {
		$zoom$ = scale
		isZoomOpened = true
	}

	export function zoomOut() {
		$zoom$ = initialZoom
    isZoomOpened = false
    resetAxisWithDelay()
	}

	export function getIsZoomOpened() {
		return isZoomOpened
	}

	function handlePanStart() {
		ctx.tryToggleZoomWith('mousedown')
	}

	function handlePanMove({ detail: { cursorDistanceX: dx, cursorDistanceY: dy } }) {
		ctx.tryToggleZoomWith('mousemove')
		axis$.set({ x: lastAxis.x + dx, y: lastAxis.y + dy })
	}

	function handlePanEnd({ detail: { clientX: x, clientY: y } }) {
		lastAxis.x = $axis$.x
		lastAxis.y = $axis$.y
		ctx.tryToggleZoomWith('mouseup', { x, y })
	}

  function handleWheel({ deltaY }) {
    if (!isZoomOpened) return

    if (deltaY >= 0) {
      $zoom$ += zoomWheel
    } else {
      if ($zoom$ <= scale) {
        zoomOut()
        return
      }
      $zoom$ -= zoomWheel
    }
  }

  function handleKeydown({ key }) {
    if (key === "Escape" && isZoomOpened) {
      zoomOut()
    }
  }
</script>

<style>
	div {
		will-change: transform;
	}

	.isZoomOpened {
		@apply absolute;
	}
</style>

<div
	use:pannable
	on:panstart="{handlePanStart}"
	on:panmove="{handlePanMove}"
	on:panend="{handlePanEnd}"
	class:isZoomOpened
	class:invisible="{!isZoomOpened}"
	class="z-10 duration-300 PhotoSwipe-Zoom {$$props.class || ''}"
	style="transform: translate3d({$axis$.x}px, {$axis$.y}px, 0) scale({$zoom$})"
>
	<slot />
</div>

<svelte:window 
  on:wheel="{handleWheel}" 
  on:keydown="{handleKeydown}"
/>
