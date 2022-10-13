<script context="module">
  export const PHOTOSWIPE = {}
</script>

<script>
	import { onMount, setContext, createEventDispatcher } from 'svelte'
	import { writable } from 'svelte/store'
	import { fade, fly } from 'svelte/transition'
	import { goto, query as q } from '~/lib'
	import { Button, Icon, Swiper, ArrowControl } from '../'
	import Zoom from './Zoom.svelte'

	export let items = []
	export let zoom = 3

	let bodyEl = q('body')
	let isOpened = false
	let isZoomOpened = false
	let swiperEl
	let zoomEl
	let swiperActivedIndex$ = writable(0)
  let clickToZoom = 0

  const CLICK_COUNT_TO_IN = 2
  const dispatch = createEventDispatcher()

	export function open(index = 0) {
    swiperActivedIndex$.set(index)
		isOpened = true
		onOpen()
	} 

	export function close() {
		isOpened = false
		onClose()
	}

	$: getSwiperActivatedTitle = () => items.length && items[$swiperActivedIndex$].title
	$: isNextButtonDisabled = () => $swiperActivedIndex$ === items.length - 1
	$: isPrevButtonDisabled = () => $swiperActivedIndex$ === 0

	const gotoNextPhoto = () => {
		let _swiperActiveIndex = $swiperActivedIndex$
		if ($swiperActivedIndex$ === items.length - 1) {
			_swiperActiveIndex = 0
		} else {
			_swiperActiveIndex++
		}
		swiperEl.goto(_swiperActiveIndex)
	}

	const gotoPrevPhoto = () => {
		let _swiperActiveIndex = $swiperActivedIndex$
		if ($swiperActivedIndex$ === 0) {
			$swiperActivedIndex$ = items.length - 1
		} else {
			_swiperActiveIndex--
		}
		swiperEl.goto(_swiperActiveIndex)
	}

  function handleKeydown({ key }) {
    if (key === "Escape") {
      if (isOpened && !zoomEl.getIsZoomOpened()) {
        close()
      }
    }
  }

	const onOpenZoom = (axis) => {
    clickToZoom = 0
		zoomEl.zoomIn(axis)
    dispatch('zoomIn')
	}

	const onCloseZoom = () => {
    clickToZoom = 0
		zoomEl.zoomOut()
    dispatch('zoomOut')
	}

  const onToggleZoom = (axis) => {
    if (zoomEl.getIsZoomOpened()) {
      onCloseZoom()
    } else {
      onOpenZoom(axis)
    }
  }

  // check if click is not a panmove
  // if is a click call the toggle
  const tryToggleZoomWith = (mode, axis) => {
    switch (mode) {
      case 'mousedown': {
        clickToZoom = 1
        break
      }
      case 'mouseup': {
        clickToZoom++
        if (clickToZoom === CLICK_COUNT_TO_IN) {
          onToggleZoom(axis)
        }
        break
      }
      case 'mousemove': {
        clickToZoom = 0
      }
    }
  }

	const onClose = () => {
		bodyEl.classList.remove('is-photoswipe-open')
    dispatch('close')
	}

	const onOpen = () => {
		bodyEl.classList.add('is-photoswipe-open')
    dispatch('open')
  }

  setContext(PHOTOSWIPE, {
    tryToggleZoomWith: (mode, axis) => tryToggleZoomWith(mode, axis) 
  })

	onMount(() => {
		if (isOpened) onOpen()

		return () => {
			onClose()
		}
	}) 
</script>

<style>
	:global(body.is-photoswipe-open) {
		@apply overflow-hidden;
	}

	.PhotoSwipe {
		transform: translateZ(0);

		& :global(.__swiper-item),
		& :global(.PhotoSwipe-Zoom) {
			width: 50%;
			margin-left: 25%;
			margin-right: @margin-left;
		}

		& :global(img) {
			cursor: zoom-in;
		}
	}
</style>

{#if isOpened}
	<div
		transition:fade
		class="fixed inset-0 z-30 flex flex-col justify-between w-screen h-screen overflow-hidden PhotoSwipe bg-primary-fg"
	>
		<header class="z-10 flex justify-end h-10 bg-primary">
			<Button
				class="w-10 rounded-bl-lg grid place-items-center bg-secondary"
				on:click="{() => close()}"
			>
				<Icon.Close color="var(--white)" scale="{1.5}" />
			</Button>
		</header>

		<ArrowControl class="absolute inset-0 w-full m-auto " isBetween="{true}">
			<ArrowControl.Prev
				class="rounded-tl-none rounded-bl-none"
				disabled="{isPrevButtonDisabled()}"
				on:click="{() => gotoPrevPhoto()}"
			/>
			<ArrowControl.Next
				class="rounded-tr-none rounded-br-none"
				disabled="{isNextButtonDisabled()}"
				on:click="{() => gotoNextPhoto()}"
			/>
		</ArrowControl>

		<div class="grid">
			<Swiper
				class="col-start-1 row-start-1"
				on:panstart="{() => tryToggleZoomWith('mousedown')}"
        on:panmove="{() => tryToggleZoomWith('mousemove')}"
        on:panend="{({ detail }) => tryToggleZoomWith('mouseup', { x: detail.cursorX, y: detail.cursorY })}"
        on:swipe="{({ detail }) => {
          swiperActivedIndex$.set(detail.index)
          dispatch('swipe', detail)
        }}"
				bind:this="{swiperEl}"
				items="{items}"
        startOnIndex="{$swiperActivedIndex$}"
				let:prop="{item}"
			>
				<Swiper.Item>
					{#if item}
						<slot name="swipe" {...item} />
					{/if}
				</Swiper.Item>
			</Swiper>

      <Zoom 
        class="col-start-1 row-start-1"
        bind:this="{zoomEl}" 
        scale="{zoom}"
      >
        <slot 
          name="zoom" 
          data="{items[$swiperActivedIndex$]}" 
        />
			</Zoom>
		</div>

		<footer class="w-full h-20 grid place-items-center bg-primary">
			{#key getSwiperActivatedTitle()}
				<p in:fly="{{ x: 200, delay: 500 }}" class="text-xl font-bold tracking-wider text-trinary">
					{getSwiperActivatedTitle()}
				</p>
			{/key}
		</footer>
	</div>
{/if}

<svelte:window 
  on:keydown="{handleKeydown}"
/>
