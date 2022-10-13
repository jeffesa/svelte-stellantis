<script>
	import { createEventDispatcher } from 'svelte'
	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import Icon from './../Icon'
	import { pannable, bitmap } from '~/lib'

	export let name
	export let ext
	export let path
	export let between
	export let enable
	export let size

	const dispatch = createEventDispatcher()
	const frames = writable(null)
	const cachedBitmap = bitmap()

	const requestedFrameCount = writable(null)
	let canvas
	let frameCounter = 0
	let initialDrawSalt
	let canvasContext
	let moveTracked = false
	let isNotDragging = true

	$: if (canvas) {
		canvasContext = canvas.getContext('2d')
	}

	// Draw first frame instead of image
	$: if ($frames) {
		draw($frames[between[0]])
	}

	requestedFrameCount.subscribe(() => {
		if ($frames) {
			draw($frames[frameCounter])
		}
	})

	const getFrameAssetPath = (n) => `${path}/${('0' + n).slice(-2)}.${ext}`

	const load360 = () => {
		moveTracked = false
		frames.set(null)
		let loadingFrames = []

		for (let i = between[0]; i <= between[1]; i++) {
			const frameAsset = getFrameAssetPath(i)
			const caching = cachedBitmap(frameAsset)

			if (caching instanceof Map) {
				loadingFrames.push(caching.get(frameAsset))
			} else {
				loadingFrames.push(caching)
			}
		}

		Promise.all(loadingFrames).then((loadedFrames) => {
			frames.set(loadedFrames)
			dispatch('loaded')
		})
	}

	const handlePanStart = () => {
		initialDrawSalt = window.screen.width / between[1]
		requestedFrameCount.set(initialDrawSalt)
		moveTracked = false
		isNotDragging = false
		dispatch('panstart')
	}

	const handlePanMove = (evt) => {
		const {
			detail: { screenDistanceX: requestingFrameCount, changeDirectionX }
		} = evt
		dispatch('panmove')

		// Reset on mouse change direction
		if (changeDirectionX) {
			requestedFrameCount.set(initialDrawSalt)
		}

		if (requestingFrameCount > 0) {
			if (requestingFrameCount >= $requestedFrameCount) {
				requestNextFrame()
			}
		} else {
			if (Math.hypot(requestingFrameCount) >= $requestedFrameCount) {
				requestPrevFrame()
			}
		}

		if (!moveTracked) {
			// registerTrack('VersionsPage_GirouCarroPrimeiraVez', name)
			registerTrack('VersionsPage_GirouCarro', name)
			moveTracked = true
		}
	}

	const handlePanEnd = () => {
		dispatch('panend')
		isNotDragging = true
	}

	const requestNextFrame = () => {
		if (frameCounter === between[1]) {
			frameCounter = 0
		} else {
			frameCounter++
		}
		requestedFrameCount.update((drawValue) => initialDrawSalt + drawValue)
	}

	const requestPrevFrame = () => {
		if (frameCounter === 0) {
			frameCounter = between[1]
		} else {
			frameCounter--
		}
		requestedFrameCount.update((drawValue) => initialDrawSalt + drawValue)
	}

	const draw = (image) => {
		canvas.width = size[0]
		canvas.height = size[1]
		canvasContext.drawImage(image, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
	}

	// habilitar e trocar o path da imagem inicializa o 360
	$: enable && path && load360()
	$: isLoading = enable && !$frames
</script>

<div
	class="360 relative {$$props.class}"
	use:pannable
	on:panstart="{handlePanStart}"
	on:panmove="{handlePanMove}"
	on:panend="{handlePanEnd}"
>
	{#if !enable}
		<slot />
	{:else if isLoading}
		<span
			class="absolute z-0 flex items-center justify-center w-full h-full font-black text-trinary"
		>
			CARREGANDO...
		</span>
	{/if}
	<canvas
		class="w-full h-full"
		bind:this="{canvas}"
		class:invisible="{!enable}"
		class:absolute="{!enable}"
	></canvas>
	{#if isNotDragging}
		<div
			transition:fade
			on:click="{() => (enable = true)}"
			class="absolute z-10 select-none bottom-10 right-4 sm:left-2 sm:bottom-32 row-start-1 col-start-1"
		>
      <Icon.Drag scale="{0.9}" />
		</div>
	{/if}
</div>
